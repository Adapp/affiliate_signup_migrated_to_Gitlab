var express = require('express'),
  http = require('http'),
  path = require('path'),
  zipper = require('./zipBuilder');

var app = module.exports = express();

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'assets')));
});

app.configure('development', function() {
  app.use(express.logger('dev'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true}));
  app.set('port', 3000);
});

app.configure('production', function() {
  app.set('port', process.env.AFF_SIGNUP_PORT || 8080);
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
