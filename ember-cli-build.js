/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
    var app = new EmberApp(defaults, {
        // 'hinting': false,
        // "ember-cli-qunit": {
        //     useLintTree: false
        // }
	    sassOptions: {
	        extension: 'sass'
        },
	    'ember-cli-babel': {
		    includePolyfill: true
	    }
    });


    app.import('bower_components/bulma/css/bulma.css');
    app.import('bower_components/font-awesome/css/font-awesome.min.css');
    app.import('bower_components/font-awesome/fonts/fontawesome-webfont.woff', {
        destDir: 'fonts'
    });
    app.import('bower_components/font-awesome/fonts/fontawesome-webfont.woff2', {
        destDir: 'fonts'
    });
    app.import('bower_components/font-awesome/fonts/fontawesome-webfont.ttf', {
        destDir: 'fonts'
    });

    return app.toTree();
};
