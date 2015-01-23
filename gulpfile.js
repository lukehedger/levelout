var gulp = require('gulp'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	sourcemaps = require('gulp-sourcemaps'),
	myth = require('gulp-myth'),
	minifycss = require('gulp-minify-css'),
	cache = require('gulp-cache'),
	imagemin = require('gulp-imagemin'),
	gutil = require('gulp-util');

gulp.task('browserify', function () {
	browserify({
		entries: ['./coffee/app.coffee'],
		extensions: ['.coffee'],
		debug: true
	})
	.bundle()
	.on('error', gutil.log)
	.pipe(source('bundle.js'))
	.pipe(gulp.dest('./js'));
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
	gulp.start('browserify', 'myth', 'images', 'watch');
});

gulp.task('watch', function() {
	gulp.watch('myth/**/*.css', ['myth']);
	gulp.watch('coffee/**/*.coffee', ['browserify']);
	gulp.watch('_img/**/*', ['images']);
});

// this doesn't work
// gulp.task('jekyll', function () {
// 	require('child_process').spawn('bundle', ['exec', 'jekyll', 'serve --watch'], { stdio: 'inherit' });
// });
