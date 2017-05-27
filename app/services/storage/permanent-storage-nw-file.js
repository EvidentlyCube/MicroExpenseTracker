import Ember from "ember";

export default Ember.Service.extend({
	fs: null,
	savePath: null,
	isEnabled: false,

	init(){
		if (window.hasOwnProperty('__nw_require')) {
			this.set('isEnabled', true);
			this.set('fs', window.__nw_require('fs'));
			this.set('savePath', window.__nw_save_path);
		}
	},

	setItem(key, value){
		const fs = this.get('fs');
		const path = this.getStorageFilePath(key);

		try {
			fs.unlinkSync(path);
		} catch (e) {}

		fs.writeFileSync(path, JSON.stringify(value));
	},

	getItem(key){
		const fs = this.get('fs');
		const path = this.getStorageFilePath(key);

		try {
			return JSON.parse(fs.readFileSync(path, {encoding: 'utf-8'}));
		} catch (e) {
			return null;
		}
	},

	getStorageFilePath(key) {
		return this.get('savePath') + "/" + this._slugify(key) + "-" + this._hashString(key) + ".json";
	},

	_hashString(s) {
		let h = 0, l = s.length, i = 0;
		if (l > 0) {
			while (i < l) {
				h = (h << 5) - h + s.charCodeAt(i++) | 0;
			}
		}
		return h;
	},

	_slugify(s) {
		return s.replace(/[^a-z0-9_-]/ig, '-').replace(/-+/g, '-');
	}
});
