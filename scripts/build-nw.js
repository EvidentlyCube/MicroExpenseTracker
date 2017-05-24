var NwBuilder = require('nw-builder');
var nw = new NwBuilder({
	files: __dirname + '/../dist/**/**', // use the glob format
	platforms: ['win32', 'win64', 'osx64', 'linux32', 'linux64'],
	flavor: 'normal',
	buildDir: __dirname + "/../nw-dist",
	cacheDir: __dirname + "/../nw-cache",
	zip: false
});

//Log stuff you want

nw.on('log',  console.log);

// Build returns a promise
nw.build().then(function () {
	console.log('all done!');
}).catch(function (error) {
	console.error(error);
});