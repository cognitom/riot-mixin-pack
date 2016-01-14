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
      '../dom-event/spec.js',
      '../sync-event/spec.js',
      '../parent-scope/spec.js'
    ],
    browsers: ['PhantomJS'],
    reporters: ['mocha'],
    singleRun: true
  })
}
