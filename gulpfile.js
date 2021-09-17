// Include gulp.
var gulp     = require('gulp');
var series   = require('gulp');
var parallel = require('gulp');

// Include plugins.
var sass      = require('gulp-sass')(require('sass'));
var uglify    = require('gulp-uglify');
var cleanCSS  = require('gulp-clean-css');
var rename    = require('gulp-rename');
var concat    = require('gulp-concat');
var argv      = require('yargs').argv;

// read parameters
var isDebug = (argv.debug === undefined) ? false : true;

// init
var initMsg = isDebug
	? "Build assets in debug-mode"
	: "Build assets (use `--debug` for unminified version)";

console.log("");
console.log("\x1b[7m%s\x1b[0m", "---------- " + initMsg + " ----------");
console.log("");

// 
// Task to compile sass
// 
gulp.task('compile-sass', () => {

	var css_file = gulp.src('./src/scss/styles.scss')
		.pipe(sass());

	if (!isDebug) {

		css_file = css_file
			.pipe(cleanCSS({
				format : { wrapAt: 1024 }
			}));
	}

	return css_file
		.pipe(rename({
			extname : '.min.css'
		}))
		.pipe(gulp.dest('./dist/css'));
});

// 
// Task to compile js
// 
gulp.task('compile-js', () => {

	var js_files = gulp.src('./src/js/**/*.js')
		.pipe(concat('script.js'));

	if (!isDebug) {

		js_files = js_files
			.pipe(uglify());
	}

	return js_files
		.pipe(rename({
			extname : '.min.js'
		}))
		.pipe(gulp.dest('./dist/js'));
});

// 
// Task to compile libs
// 
gulp.task('compile-css-libs', () => {

	var libs_css = [
		'./src/libs/demo-lib/demo.css'
	];

	return gulp.src(libs_css)
		.pipe(concat('vendor.min.css'))
		.pipe(cleanCSS({
			format : { wrapAt: 1024 }
		}))
		.pipe(gulp.dest('./dist/libs/'));
});
gulp.task('compile-js-libs', () => {

	var libs_js = [
		'./src/libs/demo-lib/demo.js'
	];

	return gulp.src(libs_js)
		.pipe(concat('vendor.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/libs/'));
});
gulp.task('compile-libs', gulp.series('compile-css-libs','compile-js-libs'));

// 
// Task to copy fonts 
// 
gulp.task('copy-fonts', () => {

	return gulp.src('./src/fonts/**/*.{eot,svg,ttf,woff}')
		.pipe(gulp.dest('./dist/fonts/'));
});

// 
// Task to watch changes
// 
gulp.task('watch-assets', () => {
	
	gulp.watch('./src/scss/**/*.scss', gulp.series(['compile-sass']));
	gulp.watch('./src/js/**/*.js', gulp.series(['compile-js']));
});

// 
// Export tasks
// 

// Task to build assets
gulp.task('build-assets', gulp.series('compile-libs', 'compile-sass', 'compile-js', 'copy-fonts'));

// Default-Task
gulp.task('default', gulp.series(['build-assets', 'watch-assets']));
