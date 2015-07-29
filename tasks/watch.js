var gulp = require('gulp');

module.exports = function() {

  gulp.watch('./source/css/**/*.scss', ['style']);

};
