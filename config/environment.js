/* jshint node: true */

module.exports = function (environment) {
	var ENV = {
		modulePrefix: 'micro-expense-tracker',
		environment: environment,
		rootURL: '/MicroExpenseTracker/',
		// locationType: 'auto',
		locationType: 'hash',
		defaultLocale: 'en',
		EmberENV: {
			FEATURES: {
				// Here you can enable experimental features on an ember canary build
				// e.g. 'with-controller': true
			},
			EXTEND_PROTOTYPES: {
				// Prevent Ember Data from overriding Date.parse.
				Date: false
			}
		},

		APP: {
			// Here you can pass flags/options to your application instance
			// when it is created
		},
		i18n: {
			defaultLocale: 'en'
		}
	};

	if (environment === 'development') {
		// ENV.APP.LOG_RESOLVER = true;
		// ENV.APP.LOG_ACTIVE_GENERATION = true;
		// ENV.APP.LOG_TRANSITIONS = true;
		// ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
		// ENV.APP.LOG_VIEW_LOOKUPS = true;
	}

	if (environment === 'production') {

	}

	ENV.apiHost = 'http://localhost/met_api/index.php';

	return ENV;
};
