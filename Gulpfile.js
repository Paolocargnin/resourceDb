var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    tinylr,
	notify = require("gulp-notify"),
    options={
    	publicPath:'./public/'
    };

function handleError(err) {
	console.log(err.toString());
	this.emit('end');
}

gulp.task('onerror', function () {
  return gulp.src('somefile')
    .pipe(someStream())
    .on('error', handleError);
});


gulp.task('livereload', function() {
	tinylr = require('tiny-lr')();
	tinylr.listen(4002);
});

gulp.task('express', function() {
	var app = require('./app');
	app.listen(4000);
});

gulp.task('styles', function() {
	return gulp.src(options.publicPath+'sass/global.scss')
		.pipe(sass({ style: 'expanded' }))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'opera 12.1'))
		.pipe(gulp.dest(options.publicPath+'css'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest(options.publicPath+'css'))
		.pipe(notify("The CSS is Gulpisize ;) !"))
		// .pipe(styles({errorHandler: notify.onError("Error: <%= error.message %>")}));
});

gulp.task('watch', function() {
	gulp.watch(options.publicPath+'sass/*.scss', ['styles']);
});


gulp.task('default', ['express', 'livereload', 'watch'], function() {

});
