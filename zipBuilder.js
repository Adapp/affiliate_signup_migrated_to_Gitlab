var fs = require('fs'),
    hb = require('handlebars'),
    zip = require('node-native-zip'),
    Q = require('q');

hb.registerHelper('escapeQuotes', function(entity) {
  var e2 = entity.replace('"', '\\"');
  return  new hb.SafeString(e2.replace("'", "\\'"));
});


function compileAndArchive(localPath, zipPath, archive, context) {
  var dfd = Q.defer();
  fs.readFile(localPath, 'utf8', function(err, data) {
    if(err) { dfd.reject(err); return; }
    var template = hb.compile(data);
    archive.add(zipPath, new Buffer(template(context), 'utf8'));
    dfd.resolve();
  });
  return dfd.promise;
};

module.exports = function(context, cb) {
  var archive = new zip(),
      uncompiled = [
          {'name': 'css/foundation.min.css', 'path': './package/foundation.min.css'},
          {'name': 'js/modernizr.foundation.min.js', 'path': './package/modernizr.foundation.js'},
          {'name': 'js/foundation.min.js', 'path': './package/foundation.min.js'}
      ];

  //Compile the html then the javascript.
  compileAndArchive('./package/index.html', 'index.html', archive, context).then(function() {
    return compileAndArchive('./package/signup.js', 'js/signup.js', archive, context);
  }).then(function() {
    archive.addFiles(uncompiled, function(err) {
      if (err) {console.log(err);}
      cb(archive);
    });
  });
};

