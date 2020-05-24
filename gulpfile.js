// Include gulp.
var gulp     = require('gulp');
var series   = require('gulp');
var parallel = require('gulp');

// Include plugins.
var sass      = require('gulp-sass');
var uglify    = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var rename    = require('gulp-rename');
var concat    = require('gulp-concat');
var argv      = require('yargs').argv;

sass.compiler = require('node-sass');

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

	var css_file = gulp.src('./assets/src/scss/styles.scss')
		.pipe(sass());

	if (!isDebug) {

		css_file = css_file
			.pipe(uglifycss({
				"maxLineLen"   : 1024,
				"uglyComments" : true
			}));
	}

	return css_file
		.pipe(rename({
			extname : '.min.css'
		}))
		.pipe(gulp.dest('./assets/built/css'));
});

// 
// Task to compile js
// 
gulp.task('compile-js', () => {

	var js_files = gulp.src('./assets/src/js/**/*.js')
		.pipe(concat('script.js'));

	if (!isDebug) {

		js_files = js_files
			.pipe(uglify());
	}

	return js_files
		.pipe(rename({
			extname : '.min.js'
		}))
		.pipe(gulp.dest('./assets/built/js'));
});

// 
// Task to compile libs
// 
gulp.task('compile-css-libs', () => {

	var libs_css = [
		'./assets/src/libs/demo-lib/demo.css'
	];

	return gulp.src(libs_css)
		.pipe(concat('vendor.min.css'))
		.pipe(uglifycss({
			"maxLineLen"   : 1024,
			"uglyComments" : true
		}))
		.pipe(gulp.dest('./assets/built/libs/'));
});
gulp.task('compile-js-libs', () => {

	var libs_js = [
		'./assets/src/libs/demo-lib/demo.js'
	];

	return gulp.src(libs_js)
		.pipe(concat('vendor.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./assets/built/libs/'));
});
gulp.task('compile-libs', gulp.series('compile-css-libs','compile-js-libs'));

// 
// Task to copy fonts 
// 
gulp.task('copy-fonts', () => {

	return gulp.src('./assets/src/fonts/**/*.{eot,svg,ttf,woff}')
		.pipe(gulp.dest('./assets/built/fonts/'));
});

// 
// Task to watch changes
// 
gulp.task('watch-assets', () => {
	
	gulp.watch('./assets/src/scss/**/*.scss', gulp.series(['compile-sass']));
	gulp.watch('./assets/src/js/**/*.js', gulp.series(['compile-js']));
});

// 
// Export tasks
// 

// Task to build assets
gulp.task('build-assets', gulp.series('compile-libs', 'compile-sass', 'compile-js', 'copy-fonts'));

// Default-Task
gulp.task('default', gulp.series(['build-assets', 'watch-assets']));
