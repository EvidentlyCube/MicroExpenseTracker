/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
	var app = new EmberApp(defaults, {
		LOG_BINDINGS: true,
		// 'hinting': false,
		// "ember-cli-qunit": {
		//     useLintTree: false
		// }
		sassOptions: {
			extension: 'sass'
		},
		'ember-cli-babel': {
			includePolyfill: true
		},
		'ember-font-awesome': {
			useScss: true
		}
	});

	app.import('bower_components/bulma/css/bulma.css');
	app.import('bower_components/downloadjs/download.js');

	return app.toTree();
};
