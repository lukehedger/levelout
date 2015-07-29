var gulp = require('gulp');
var eslint = require('gulp-eslint');

module.exports = function() {

  return gulp.src(['./source/js/**/**.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());

};
