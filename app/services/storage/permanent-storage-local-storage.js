import Ember from "ember";

export default Ember.Service.extend({
	setItem(key, value){
		window.localStorage.setItem(key, JSON.stringify(value));
	},

	getItem(key){
		try {
			var result = window.localStorage.getItem(key);
			return  JSON.parse(result);
		} catch (e) {
			return null;
		}
	}
});
