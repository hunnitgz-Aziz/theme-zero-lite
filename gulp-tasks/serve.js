'use strict';

var merge = require('lodash.merge');
var browserSync = require('browser-sync');
var patterns = browserSync.create('patterns');
var site = browserSync.create('site');

module.exports = function (gulp, options, done) {

  if (options.browserSync.site.enabled) {
    var siteOptions = merge(
      {},
      options.browserSync.site,
      {
        proxy: options.paths.devUrl,
        snippetOptions: {
          rule: {
            match: /<\/body>/i,
            fn: function (snippet, match) {
              return snippet + match;
            }
          }
        }
      }
    );

    site.init(siteOptions);
  }
  done();
};
