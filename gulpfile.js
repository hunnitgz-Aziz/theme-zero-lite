'use strict';

var gulp = require('gulp');
var yaml = require('js-yaml');
var fs = require('fs');
var assign = require('lodash.assign');
//var backstopConfig  = require('./backstop.json');
var argv = require('yargs').argv;
//var runSequence = require('run-sequence').use(gulp);
var clean = require('gulp-clean');
var shell = require('gulp-shell');
var uglify = require('gulp-uglify');
var pump = require('pump');

var _ = require('underscore');
var mocha = require('gulp-mocha');


var gulpRequireTasks = require('gulp-require-tasks');
// read default config settings
var config = prepareGulpTasks();

//var backstopTasks = require('./gulp-tasks/backstop.js');
//backstopTasks(gulp, config);

//var renameTasks = require('./gulp-tasks/rename/rename.js');
//renameTasks(gulp, config);

require('./gulp-tasks/bootstrap.js')(gulp, config);

// # Watch
gulp.task('watch', gulp.parallel('styles:watch', 'serve'));
gulp.task('default', gulp.parallel('watch'));

// # Build Everything
gulp.task('build', gulp.series(
	'bootstrap:build',
	gulp.parallel('images:build', 'styles:build'/*, 'pl:build'*/)
));


// # Gulp Tasks
function prepareGulpTasks() {
	var config = yaml.safeLoad(fs.readFileSync('default.gulpfile.yml', 'utf8'), {json: true});
	try {
		// override default config settings
		var customConfig = yaml.safeLoad(fs.readFileSync('gulpfile.yml', 'utf8'), {json: true});
		config = assign(config, customConfig);
	} catch (e) {
		console.log('No custom config found! Proceeding with default config only.');
	}

// Should we build sourcemaps? "gulp build --sourcemaps"
	config.buildSourceMaps = typeof argv.sourcemaps !== "undefined" ? argv.sourcemaps : true;

	gulpRequireTasks({
		path: process.cwd() + '/gulp-tasks',
		arguments: [config],
		gulp: gulp
	});
	return config;
}
