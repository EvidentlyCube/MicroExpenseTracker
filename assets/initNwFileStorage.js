(function () {
	if (!window.hasOwnProperty('require')) {
		return;
	}
	window.__nw_global = window.global;
	window.__nw_require = window.require;
	window.__nw_save_path = '_data';
	window.__nw_backup = forceBackup;

	var fs = window.__nw_require('fs');
	var path = window.__nw_require('path');


	delete window.global;
	delete window.require;

	var savePath = '_data';
	var backupPath = '_backupData';

	createDirectory(savePath);
	createDirectory(backupPath);

	backupData();

	setInterval(backupData, 1000 * 60 * 60); // Try to backup every hour

	function forceBackup() {
		var backupTo = getForcedBackupPath();
		if (directoryExists(backupTo)){
			return;
		}

		fs.mkdirSync(backupTo);

		copyFolderRecursiveSync(savePath, backupTo);
	}

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

	/* UTILS */

	function directoryExists(path){
		try {
			var stat = fs.statSync(path);
			return stat.isDirectory() || stat.isFile();

		} catch(e) {
			return false;
		}
	}

	function getForcedBackupPath(){
		var date = new Date();
		var path = date.getFullYear()
			+ "-" + padDate(date.getMonth()+1)
			+ "-" + padDate(date.getDate())
			+ "_" + padDate(date.getHours())
			+ "_" + padDate(date.getMinutes())
			+ "_" + padDate(date.getSeconds());

		return backupPath + "/" + path;
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

