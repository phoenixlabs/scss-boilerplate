var gulp         = require('gulp'),
	sass         = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cssmin       = require('gulp-cssmin'),
	concat       = require('gulp-concat'),
	uglify       = require('gulp-uglify'),
	order        = require('gulp-order'),
	watch        = require('gulp-watch'),
	livereload   = require('gulp-livereload'),
	notify       = require('gulp-notify')
	install      = require("gulp-install");


gulp.task('runBower', function() {
	gulp.src('./bower.json')
		.pipe(install());
});

gulp.task('sass', function() {
	gulp.src('src/scss/*.scss')
		.pipe(sass({
			onError: function(err) {
				return notify().write(err);
			}
		}))
		.pipe(autoprefixer("last 2 version", "ie 9"))
		.pipe(cssmin())
		.pipe(gulp.dest('dist/css'));
});


gulp.task('js', function() {
	gulp.src('src/js/main.js')
		.pipe(concat('main.js'))
		.pipe(uglify({mangle: false}))
		.pipe(gulp.dest('dist/js'));
});


gulp.task('watch', function() {
	livereload.listen();

	gulp.watch('src/scss/**/*.scss', ['sass']).on('change', livereload.changed);
	gulp.watch('src/js/**/*.js', ['js']).on('change', livereload.changed);
	gulp.watch('./**/*.html').on('change', livereload.changed);
});


gulp.task('build', ['runBower', 'sass', 'js']);