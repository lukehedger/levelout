var gulp = require('gulp'),
	coffee = require('gulp-coffee'),
	myth = require('gulp-myth'),
	jekyll = require('gulp-jekyll'),
	minifycss = require('gulp-minify-css'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
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
	gulp.src('myth/**/*.css')
		.pipe(myth())
		.pipe(gulp.dest('css'))
		.pipe(minifycss({
			keepBreaks: true,
			root: 'css',
			processImport: true
		}))
		.pipe(gulp.dest('css'))
		.pipe(livereload(server));
});

gulp.task('images', function() {
  return gulp.src('_img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('img'));
});

gulp.task('default', function () {
	gulp.start('coffee', 'myth', 'images', 'watch');
});

gulp.task('watch', function() {
	gulp.watch('myth/**/*.css', ['myth']);
	gulp.watch('coffee/**/*.coffee', ['coffee']);
	gulp.watch('_img/**/*', ['images']);
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

// gulp build task not in use
gulp.task('build', function(){
	gulp.src(['js/main.js', 'js/app.js'])
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js'));
});