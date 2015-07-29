var gulp = require('gulp');
var script = require('./tasks/script');
var test = require('./tasks/test');
var moduleTask = require('./tasks/module');
var style = require('./tasks/style');
var watch = require('./tasks/watch');
var server = require('./tasks/server');
var publish = require('./tasks/publish');

gulp.task('script', ['module:rebuild'], script);
gulp.task('script:build', ['test', 'module:rebuild'], script.build);

gulp.task('test', test);

gulp.task('module', moduleTask);
gulp.task('module:rebuild', moduleTask.rebuild);

gulp.task('style', style);
gulp.task('style:build', ['test'], style.build);

gulp.task('watch', watch);

gulp.task('server', ['script'], server);

gulp.task('publish', publish);

gulp.task('default', ['script', 'style', 'watch', 'server']);

gulp.task('build', ['test', 'script:build', 'style:build']);
