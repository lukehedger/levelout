var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var sass = require('gulp-sass');
var gulpif = require('gulp-if');
var prefix = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var size = require('gulp-size');
var beep = require('beepbeep');


var debug = true;
var aliases = {};


/**
 * Will look for .scss and .css files inside the node_modules folder
 */
function npmModule(url, file, done) {

  var newPath;
  var absolute;
  var relative;

  // check if the path was already found and cached
  if (aliases[url]) {

    return done({ file: aliases[url] });

  }

  // look for SCSS modules installed through npm
  try {

    newPath = path.relative('./source/css', require.resolve(url));
    aliases[url] = newPath;
    done({ file: newPath });

  } catch (e) {

    // if not, try looking if the file inside the `node_modules` exists
    absolute = path.join(process.cwd(), 'node_modules', url);
    relative = path.relative('./source/css', absolute).replace(/\.css$/g, '');
    fs.access(absolute, fs.R_OK, function(err) {

      aliases[url] = err ? url : relative;
      done(aliases[url]);

    });

  }

}


function errorHandler(err) {

  console.log(err.toString(), '\n');
  beep();
  this.emit('end');

}


function bundle() {

  return gulp.src('./source/css/app.scss')
    .pipe(plumber(errorHandler))
    .pipe(gulpif(debug, sourcemaps.init()))
    .pipe(sass({ importer: npmModule }))
    .pipe(gulpif(debug, sourcemaps.write({includeContent: false})))
    .pipe(gulpif(debug, sourcemaps.init({loadMaps: true})))
    .pipe(prefix({ browsers: ['last 2 versions', 'ie 9'] }))
    .pipe(gulpif(debug, sourcemaps.write('.'), minify()))
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest('./public/css'));

}


bundle.build = function() {

  debug = false;
  return bundle();

};

module.exports = bundle;
