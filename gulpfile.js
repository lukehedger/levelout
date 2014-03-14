// TODO - create build task using concat, clean, uglify etc

var gulp = require('gulp'),
	coffee = require('gulp-coffee'),
	myth = require('gulp-myth'),
	jekyll = require('gulp-jekyll'),
	minifycss = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	clean = require('gulp-clean'),
	concat = require('gulp-concat'),
	gutil = require('gulp-util'),
	livereload = require('gulp-livereload'),
	lr = require('tiny-lr'),
	server = lr();

gulp.task('coffee', function () {
	gulp.src('coffee/**/*.coffee')
		.pipe(coffee({
			map: true
		}).on('error', gutil.log))
		.pipe(gulp.dest('js'))
		.pipe(livereload(server));
});

gulp.task('myth', function () {
	gulp.src('css/myth/main.css')
		.pipe(myth())
		.pipe(gulp.dest('css'))
		.pipe(minifycss())
		.pipe(gulp.dest('css'))
		.pipe(livereload(server));
});

// gulp-jekyll is still in development, only use when full config options available
gulp.task('jekyll', function () {
	gulp.src(['./index.html', './_layouts/*.html', './_posts/*.{markdown,md}'])
		.pipe(jekyll({
			source: './',
			destination: './_site/',
			bundleExec: true
		}))
		.pipe(gulp.dest('./_site/'))
		.pipe(livereload(server));
});

gulp.task('default', function () {
	gulp.start('coffee', 'myth');
});

gulp.task('watch', function() {
	gulp.watch('css/myth/**/*.css', ['myth']);
	gulp.watch('coffee/**/*.coffee', ['coffee']);
});