//jshint strict: false
exports.config = {

  allScriptsTimeout: 11000,

  specs: [
    'components/**/*.e2e.js',
    'services/**/*.e2e.js'
  ],

  rootElement: 'section#root',

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }

};
