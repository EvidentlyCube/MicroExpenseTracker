import Ember from "ember";
import OptionNames from "../constants/options/option-names";

const LocalStorageItemName = '__app_options';
export default Ember.Service.extend({
	options: null,

	init(){
		let options = localStorage.getItem(LocalStorageItemName);
		try {
			options = JSON.parse(options);
		} catch (e) {
			options = {};
		}

		this.set('options', options ? options : {});
	},

	getCurrentLanguage(){
		return this._getOptionByName(OptionNames.CurrentLanguage, 'en');
	},

	setCurrentLanguage(value){
		this._setOptionByName(OptionNames.CurrentLanguage, value);
	},

	_getOptionByName(name, defaultValue){
		const options = this.get('options');

		return options.hasOwnProperty(name) ? options[name] : defaultValue;
	},

	_setOptionByName(name, value){
		const options = this.get('options');

		options[name] = value;
		localStorage.setItem(LocalStorageItemName, JSON.stringify(options));
	}
});
