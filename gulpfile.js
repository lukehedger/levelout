var gulp = require('gulp'),
	coffee = require('gulp-coffee'),
	myth = require('gulp-myth'),
	jekyll = require('gulp-jekyll'),
	minifycss = require('gulp-minify-css'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	gutil = require('gulp-util');

gulp.task('coffee', function () {
	gulp.src('coffee/**/*.coffee')
		.pipe(coffee({
			map: true
		}).on('error', gutil.log))
		.pipe(gulp.dest('js'));
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
		.pipe(gulp.dest('css'));
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

// this doesn't work
gulp.task('jekyll', function () {
	require('child_process').spawn('bundle', ['exec', 'jekyll', 'serve --watch'], { stdio: 'inherit' });
});