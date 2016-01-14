module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    plugins: [
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher'
    ],
    files: [
      'polyfill.js',
      '../node_modules/expect.js/index.js',
      '../node_modules/riot/riot.js',
      '../dist/riot-mixin-pack.js',
      'specs/dom-event.js',
      'specs/sync-event.js',
      'specs/parent-scope.js'
    ],
    browsers: ['PhantomJS'],
    reporters: ['mocha'],
    singleRun: true
  })
}
