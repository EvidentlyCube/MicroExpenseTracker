var packageJson = require('../package.json');
var mkdirp = require('mkdirp');
var zipdir = require('zip-dir');
var fs = require('fs');
var copydir = require('copy-dir');

var appVersion = packageJson.version;
var RootDir = __dirname + "/../";
var DistDir = RootDir + "dist/";
var BinDir = RootDir + "bin/";


mkdirp.sync(BinDir);

rebuildPackageJson();

buildSourceUpdate();
buildWebDist();
buildNw();

function rebuildPackageJson() {
	var packageJsonPath = DistDir + "package.json";
	unlink(packageJsonPath);

	var package = JSON.stringify({
		name: "MET",
		main: "MicroExpenseTracker/index.html",
		version: appVersion
	}, null, 4);

	fs.writeFileSync(packageJsonPath, package, {encoding: "utf8"});
}

function buildSourceUpdate() {
	console.log("Building source update zip");

	zipdir(DistDir, {saveTo: BinDir + '/update.zip'}, function (err) {
		if (err) {
			console.error("Source update zip error: " + err);
		} else {
			console.log("Source update zip built.");
		}

	});
}

function buildWebDist() {
	console.log("Building web dist");

	var distPath = BinDir + "webDist/";

	mkdirp.sync(distPath);
	copydir.sync(DistDir, distPath);
	unlink(distPath + "package.json");
	console.log("Web dist built");
}

function buildNw() {
	var NwBuilder = require('nw-builder');
	var nw = new NwBuilder({
		files: DistDir + 'package.json',
		platforms: ['win32', 'linux32'],
		flavor: 'normal',
		buildDir: BinDir,
		cacheDir: RootDir + "tmp-nw",
		zip: false
	});

	nw.on('log', console.log);

	nw.build().then(function () {
		['win32', 'linux32'].forEach(function (version) {
			console.log(`Copying ${version} files`);

			copydir.sync(DistDir, `${BinDir}MET/${version}/MicroExpenseTracker/`);
			console.log(`Zipping ${version} version`);
			zipdir(`${BinDir}MET/${version}/`, {saveTo: `${BinDir}/${version}.zip`}, function (err) {
				if (err) {
					console.error(`Pack ${version} error: ${err}`);
				} else {
					console.log(`Pack ${version} finished.`);
				}
			});
		});
	}).catch(function (error) {
		console.error(error);
	});
}

function unlink(path) {
	try {
		fs.unlinkSync(path);
	} catch (e) {
		//Ignore
	}
}