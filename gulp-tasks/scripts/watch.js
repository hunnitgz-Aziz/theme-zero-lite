'use strict';

var browserSync = require('browser-sync');

module.exports = function (gulp, options) {
  return gulp.watch(options.js.src, gulp.series('scripts:lint', function (done) {
    if (options.browserSync.patterns.enabled) {
      console.log('patterns reload');
      browserSync.get('patterns').reload();
    }

    if (options.browserSync.site.enabled) {
      console.log('site reload');
      browserSync.get('site').reload();
    }
	  done();
  }));
};