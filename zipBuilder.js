var fs = require('fs'),
    hb = require('handlebars'),
    zip = require('node-zip'),
    Q = require('q');

hb.registerHelper('escapeQuotes', function(entity) {
  var e2 = entity.replace('"', '\\"');
  return  new hb.SafeString(e2.replace("'", "\\'"));
});


function compileAndArchive(localPath, zipPath, archive, context) {
  var dfd = Q.defer();
  fs.readFile(localPath, 'utf8', function(err, data) {
    if (err) {
      dfd.reject(err);
      return;
    }
    var template = hb.compile(data);
    archive.file(zipPath, new Buffer(template(context), 'utf8'));
    dfd.resolve();
  });
  return dfd.promise;
}

function addUncompiled(localPath, zipPath, archive) {
  var dfd = Q.defer();
  fs.readFile(localPath, function(err, data) {
    if (err) {
      dfd.reject(err);
      return;
    }
    archive.file(zipPath, data);
    dfd.resolve();
  });
  return dfd.promise;
}

module.exports = function(context, basePath, cb) {
  var archive = new zip(),
      folderName = 'custom_signup';

  //Compile the html then the javascript.
  compileAndArchive(basePath + '/package/index.html', folderName + '/index.html', archive, context).then(function() {
    return compileAndArchive(basePath + '/package/signup.js', folderName + '/js/signup.js', archive, context);
  }).then(function() {
    var promise = Q.all([
      addUncompiled(basePath + '/package/foundation.min.css', folderName + '/css/foundation.min.css', archive),
      addUncompiled(basePath + '/package/modernizr.foundation.js', folderName + '/js/modernizr.foundation.min.js', archive),
      addUncompiled(basePath + '/package/foundation.min.js', folderName + '/js/foundation.min.js', archive)
    ]).then(function() {
      var output = archive.generate({type:'nodebuffer', compression: 'STORE'});
      cb(output);
    }, function(err) {
      console.log(err);
    });
  });
};

