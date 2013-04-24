var express = require('express'),
  http = require('http'),
  path = require('path'),
  zipper = require('./zipBuilder'),
  commander = require('commander'),
  expressWinston = require('express-winston'),
  winston = require('winston'),
  fs = require('fs'),
  q = require('q');

var app = module.exports = express();

commander
  .version('0.1.0')
  .option('-c, --config [path]', 'Absolute path to your config file.')
  .option('-p, --port [port]', 'The port to run the application on.')
  .parse(process.argv);

var waitForConfig = new q.defer();

if (!commander.config) {
  app.set('port', commander.port || 3000);
  waitForConfig.resolve();
} else{
  fs.readFile(commander.config, function(err, data) {
    if (err) {
      console.error('There was an error reading from ' + command.config + ' ', err);
      process.exit(1);
    }

    data = JSON.parse(data);
    app.set('port', commander.port || data.port || 3000);
    app.set('logLocation', data.logLocation);
    app.set('errorLogLocation', data.errorLogLocation);
    app.set('maxLogSize', data.maxLogSize);
    app.set('maxLogFiles', data.maxLogFiles);

    waitForConfig.resolve();
  });
}

waitForConfig.promise.then(function() {
  app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    if (app.get('logLocation')) {
      app.use(expressWinston.logger({
        'transports': [
          new winston.transports.File({
            'filename' : app.get('logLocation'),
            'maxsize'  :  app.get('maxLogSize'),
            'maxFiles' : app.get('maxLogFiles')
          })
        ]
      }));
    }

    app.use(app.router);

    // Error log needs to come after the router since that's the most likely place for errors to occur.
    if (app.get('errorLogLocation')) {
      app.use(expressWinston.errorLogger({
        'transports': [
          new winston.transports.File({
            'filename' : app.get('errorLogLocation'),
            'maxsize'  :  app.get('maxLogSize'),
            'maxFiles' : app.get('maxLogFiles')
          })
        ]
      }));
    }

    app.use(express.static(path.join(__dirname, 'assets')));
  });


  app.get('/', function(req, res) {
    res.render('index');
  });

  app.post('/compile', function(req, res) {
    zipper(req.body, function(archive) {
      res.setHeader('Content-type', 'application/octet-stream');
      res.setHeader('Content-disposition', 'attachment; filename=custom_signup.zip');
      res.send(archive.toBuffer());
      res.end();
    });
  });

  http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
  });
});


