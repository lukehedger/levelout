var browserSync = require('browser-sync').create();
var url = require('url');
var fs = require('fs');
var path = require('path');

var folder = path.resolve(process.cwd(), 'public');

function middleware(req, res, next) {

  var fileExists;
  var fileName;

  fileName = url.parse(req.url);
  fileName = fileName.href.split(fileName.search).join('');
  fileExists = fs.existsSync(path.resolve(folder + fileName));

  if (!fileExists && fileName.indexOf('browser-sync-client') < 0) {

    req.url = '/index.html';

  }

  next();

}

module.exports = function() {

  return browserSync.init({
    open: false,
    files: ['./public/css/*.css', './public/js/*.js', './public/*.html'],
    server: {
      baseDir: './public'
    },
    middleware: middleware
  });

};
