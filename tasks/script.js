var watchify = require('watchify');
var browserify = require('browserify');
var ractivate = require('ractivate');
var babelify = require('babelify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var size = require('gulp-size');
var beep = require('beepbeep');
var path = require('path');

var b;
var firstRun = true;
var opts = {
  entries: ['./source/js/app.js'],
  debug: true,
  cache: {},
  packageCache: {}
};


function errorHandler(err) {

  var msg = err.toString();
  var reg;
  var match;
  var matches;

  if (err) {

    msg = err.toString();

    try {

      reg = /Error:\s(.*)\s(\/.*):\W(.*)\W(\d+:\d+)/g;
      matches = [];

      while (match = reg.exec(msg)) {

        matches.push(match);

      }

      matches = matches[0];

      gutil.log(gutil.colors.red.bold('Error on Browserify:'));
      console.log('   -', gutil.colors.underline(path.relative(process.cwd(), matches[2])), gutil.colors.gray('(' + matches[4] + ')'));
      console.log('    ', matches[3]);

    } catch (e) {

      console.log(msg);

    }

  }

  beep();
  this.emit('end');

}


function bundle() {

  if (firstRun) {

    b = opts.debug ? watchify(browserify(opts)) : browserify(opts);
    b.transform(babelify);
    b.transform(ractivate);
    b.on('update', bundle);
    b.on('log', gutil.log);

    firstRun = false;

  }

  return b.bundle()
    .on('error', errorHandler)
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulpif(opts.debug,
      sourcemaps.init({ loadMaps: true }),
      uglify({ preserveComments: false })
    ))
    .pipe(gulpif(opts.debug, sourcemaps.write('.')))
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest('./public/js'));

}

bundle.build = function() {

  opts.debug = false;

  return bundle();

};

module.exports = bundle;
