'use strict';

var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

module.exports = function(gulp, options) {
	gulp.task('bootstrap:clean', function () {
		return gulp.src(['bootstrap/*', 'js/lib/bootstrap', 'js/dist/bootstrap',
			'scss/vendor/bootstrap/v4/src/*'], {read: false, allowEmpty: true})
		.pipe(clean());
	});

	gulp.task('bootstrap:build:v4', gulp.parallel(
		function() {
			return gulp.src(['node_modules/bootstrap/js/dist/**/*.js'])
			.pipe(gulp.dest('js/lib/bootstrap'));
		},
		function() {
			return gulp.src(['node_modules/bootstrap/dist/js/*'])
			.pipe(gulp.dest('js/dist/bootstrap'));
		},
		function() {
			return gulp.src(['node_modules/bootstrap/dist/css/*'])
			.pipe(gulp.dest('css/bootstrap'));
		},
		function() {
			return gulp.src(['node_modules/bootstrap/scss/**/*'])
			.pipe(gulp.dest('scss/vendor/bootstrap/v4/src'));
		}
	));

	gulp.task('bootstrap:build:js', function () {
		return gulp.src('js/lib/bootstrap/*.js')
		.pipe(sourcemaps.init())
		.pipe(uglify({
			output: { comments: true }
		}))
		.pipe(gulp.dest('js/dist/bootstrap'))
		.pipe(sourcemaps.mapSources(function(sourcePath, file) {
			var depth = sourcePath.split('/').length;
			sourcePath = '../../lib/bootstrap/' + sourcePath;
			for (var i = 1; i < depth; i++) {
				sourcePath = '../' + sourcePath;
			}
			return sourcePath;
		}))
		.pipe(sourcemaps.write('.', { addComment: false }))
		.pipe(gulp.dest('js/dist/bootstrap'));
	});

	gulp.task('bootstrap:build', gulp.series(
		'bootstrap:clean',
		'bootstrap:build:v4',
		'bootstrap:build:js'
	));
};
