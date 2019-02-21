'use strict';

var browserSync = require('browser-sync');

module.exports = function (gulp, options) {
	return gulp.watch(options.css.src, gulp.series('styles:lint', 'styles:build', function (done) {
		if (options.browserSync.site.enabled) {
			console.log('site reload');
			browserSync.get('site').reload();
		}
		done();
	}));
};