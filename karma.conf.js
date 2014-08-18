// Karma configuration
// Generated on Thu Aug 07 2014 21:34:54 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',
    frameworks: ['mocha', 'browserify', 'sinon'],
    files: [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/chai/chai.js'
    ],
    exclude: [],
    reporters: ['spec'],
    port: 9876,
    client: {
      mocha: {
        ui: 'bdd',
        reporter: 'html'
      }
    },
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    browserify: {
      files: ['test/app/**/*.spec.js'],
      debug: true,
      watch: true
    },
    preprocessors: {
      '/**/*.browserify': 'browserify'
    },
    captureTimeout: 60000,
    singleRun: false
  });
};
