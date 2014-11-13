var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    tinylr,
	notify = require("gulp-notify"),
    options={
    	publicPath:'./public/',
    	styleDir: 'sass',
    };

function swallowError (error) {
    //If you want details of the error in the console
    console.log(error.toString());
	notify(error.toString());
    this.emit('end');
}
gulp.task('livereload', function() {
	tinylr = require('tiny-lr')();
	tinylr.listen(4002);
});

gulp.task('express', function() {
	var app = require('./app');
	app.listen(4000);
});

gulp.task('styles', function() {
	return gulp.src(options.publicPath+options.styleDir+'/global.scss')
		.pipe(sass({ style: 'expanded' }))
		.on('error', notify.onError(function (error) {
				// remove all Before the sass Dir
				var msg = error.message.substr( error.message.indexOf(options.styleDir) , 200); //200 is faster then error.message.length - indexOf bla bla bla.
	            return "Error: " + msg;
            }))
		.on('error', swallowError)
		// .pipe(styles({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'opera 12.1'))
		.pipe(gulp.dest(options.publicPath+'css'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest(options.publicPath+'css'))
		.pipe(notify("The CSS is Gulpisize ;) !"));
});

gulp.task('watch', function() {
	gulp.watch(options.publicPath+options.styleDir+'/*.scss', ['styles']);
});


gulp.task('default', ['express', 'livereload', 'watch'], function() {

});