import Ember from "ember";

export default Ember.Service.extend({
	setItem(key, value){
		window.localStorage.setItem(key, JSON.stringify(value));
	},

	getItem(key){
		try {
			const result = window.localStorage.getItem(key);
			return JSON.parse(result);
		} catch (e) {
			return null;
		}
	},

	removeItem(key){
		window.localStorage.removeItem(key);
	},

	forceBackup(){
		// Silently ignore, local storage storage does not support backup
	}
});
