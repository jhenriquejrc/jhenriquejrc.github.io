var gulp = require('gulp'),
	sass = require('gulp-sass')
minify = require('gulp-minify');

const browserSync = require('browser-sync').create();

var sassConfig = {
	inputDirectory: ['resources/sass/**/*.scss', 'node_modules/bootstrap/scss/bootstrap.scss'],
	outputDirectory: 'assets/css',
	options: {
		outputStyle: 'expanded'
	}
}

gulp.task('compress', function () {
	gulp.src('resources/script/*.js')
		.pipe(minify({
			ext: {
				src: '-debug.js',
				min: '.js'
			},
			exclude: ['tasks'],
			ignoreFiles: ['.combo.js', '-min.js']
		}))
		.pipe(gulp.dest('assets/js'))
});

gulp.task('sass', function () {
	return gulp
		.src(sassConfig.inputDirectory)
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe(sass(sassConfig.options).on('error', sass.logError))
		.pipe(gulp.dest(sassConfig.outputDirectory))
		.pipe(browserSync.stream());
});

gulp.task('watch', function () {
	gulp.watch('resources/sass/**/*.scss', ['sass']);
	
});


gulp.task('js', () => {
	return gulp.src([
		'node_modules/bootstrap/dist/js/bootstrap.min.js',
		'node_modules/jquery/dist/jquery.min.js',
		'node_modules/popper.js/dist/umd/popper.min.js',
		'node_modules/bootstrap-tour/build/js/bootstrap-tour.min.js',
		'node_modules/bootstrap-tour/build/js/bootstrap-tour-standalone.min.js'
	])
		.pipe(gulp.dest('assets/vendor'))
		.pipe(browserSync.stream());
});

gulp.task('css', () => {
	return gulp.src([
		'node_modules/bootstrap-tour/build/css/bootstrap-tour.min.css',
		'node_modules/bootstrap-tour/build/css/bootstrap-tour-standalone.min.css'
	])
		.pipe(gulp.dest('assets/css'))
		.pipe(browserSync.stream());
});

gulp.task('serve', ['sass', 'compress'], () => {
	browserSync.init({
		server: './'
	});

	gulp.watch([
		'node_modules/bootstrap/scss/bootstrap.min.scss',
		'resources/sass/*.scss'
	], ['sass']);

	gulp.watch(['resources/script/**/*.js'], ['compress']);

	gulp.watch('*.html').on('change', browserSync.reload);

});

gulp.task('font-awesome', () => {
	return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
		.pipe(gulp.dest('assets/css'));
})

gulp.task('fonts', () => {
	return gulp.src('node_modules/font-awesome/fonts/*')
		.pipe(gulp.dest('assets/fonts'));
});

gulp.task('default', ['js', 'css', 'serve', 'font-awesome', 'fonts', 'sass', 'compress'])