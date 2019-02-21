'use strict';

var cached = require('gulp-cached');
var sassLint = require('gulp-sass-lint');
var gulpif = require('gulp-if');

module.exports = function (gulp, options, done) {
  if (options.css.lint.enabled) {
    return gulp.src(options.css.src)
      .pipe(cached('styles:lint'))
      .pipe(sassLint())
      .pipe(sassLint.format())
      .pipe(gulpif(options.css.lint.failOnError, sassLint.failOnError()));
  } else {
    console.log('css linting not enabled');
	  done();
  }
};