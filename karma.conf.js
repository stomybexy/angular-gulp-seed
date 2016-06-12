module.exports = function (config) {
	'use strict';

	config.set({
		basePath: '',
/*        logLevel: 'config.LOG_DEBUG',*/
		frameworks: ['jasmine'],
		files: [
            'dist/js/bundle*.js',
            'dist/*.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'components/**/*.test.js',
            'services/**/*.test.js',
						{ pattern: 'components/**/*.e2e.js', watched: false, included: false, served: false },
						{ pattern: 'services/**/*.e2e.js', watched: false, included: false, served: false },
		],
		autoWatch: true,
		singleRun: true,
		browsers: ['PhantomJS']
	});
};
