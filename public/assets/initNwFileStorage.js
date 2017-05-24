(function () {
	if (!window.hasOwnProperty('require')) {
		return;
	}
	window.__nw_global = window.global;
	window.__nw_require = window.require;

	var fs = require('fs');
	var path = require('path');

	delete window.global;
	delete window.require;

	var savePath = '_data';
	var backupPath = '_backupData';

	createDirectory(savePath);
	createDirectory(backupPath);

	window.localStorage.setItem = setItemOverride;
	window.localStorage.getItem = getItemOverride;

	backupData();

	setInterval(backupData, 1000 * 60 * 60); // Try to backup every hour

	function backupData() {
		var backupTo = getBackupPath();
		if (directoryExists(backupTo)){
			return;
		}

		fs.mkdirSync(backupTo);

		copyFolderRecursiveSync(savePath, backupTo);
	}

	function createDirectory(path) {
		try {
			fs.mkdirSync(path);
		} catch (e) {
		}
	}

	function setItemOverride(key, data) {
		var path = getStorageFilePath(key);
		try {
			fs.unlinkSync(path);
		} catch (e) {
		}
		fs.writeFileSync(path, JSON.stringify(data));
	}

	function getItemOverride(key) {
		var path = getStorageFilePath(key);
		try {
			var data = fs.readFileSync(path, {encoding: 'utf-8'});
			return JSON.parse(data);

		} catch (e) {
			return null;
		}
	}

	/* UTILS */

	function getStorageFilePath(key) {
		return savePath + "/" + slugify(key) + "-" + hashString(key) + ".json";
	}

	function directoryExists(path){
		try {
			var stat = fs.statSync(path);
			return stat.isDirectory() || stat.isFile();

		} catch(e) {
			return false;
		}
	}

	function getBackupPath(){
		var date = new Date();
		var path = date.getFullYear() + "-" + padDate(date.getMonth()+1) + "-" + padDate(date.getDate());

		return backupPath + "/" + path;
	}

	function padDate(value){
		if (value.toString().length < 2){
			return "0" + value;
		} else {
			return value;
		}
	}

	function hashString(s) {
		var h = 0, l = s.length, i = 0;
		if (l > 0){
			while (i < l){
				h = (h << 5) - h + s.charCodeAt(i++) | 0;
			}
		}
		return h;
	}

	function slugify(s) {
		return s.replace(/[^a-z0-9_-]/ig, '-').replace(/-+/g, '-');
	}

	function copyFileSync(source, target) {
		var targetFile = target;

		//if target is a directory a new file with the same name will be created
		if (fs.existsSync(target)) {
			if (fs.lstatSync(target).isDirectory()) {
				targetFile = path.join(target, path.basename(source));
			}
		}

		fs.writeFileSync(targetFile, fs.readFileSync(source));
	}

	function copyFolderRecursiveSync(source, target) {
		var files = [];

		//check if folder needs to be created or integrated
		var targetFolder = path.join(target, path.basename(source));
		if (!fs.existsSync(targetFolder)) {
			fs.mkdirSync(targetFolder);
		}

		//copy
		if (fs.lstatSync(source).isDirectory()) {
			files = fs.readdirSync(source);
			files.forEach(function (file) {
				var curSource = path.join(source, file);
				if (fs.lstatSync(curSource).isDirectory()) {
					copyFolderRecursiveSync(curSource, targetFolder);
				} else {
					copyFileSync(curSource, targetFolder);
				}
			});
		}
	}
})();

