import Ember from "ember";
import OptionNames from "../constants/options/option-names";
import StorageKeyNames from "../constants/storage/key-names";

export default Ember.Service.extend({
	i18n: Ember.inject.service(''),
	storage: Ember.inject.service("storage/permanent-storage-service"),
	options: null,

	init(){
		const options = this.get('storage').getItem(StorageKeyNames.options) || {};

		this.set('options', options);
	},

	getCurrencyDisplay(){
		return this._getOptionByName(OptionNames.CurrencyDisplay, '$~~PRICE~~');
	},

	setCurrencyDisplay(value){
		this._setOptionByName(OptionNames.CurrencyDisplay, value);
	},

	getCurrentLanguage(){
		return this._getOptionByName(OptionNames.CurrentLanguage, 'en');
	},

	setCurrentLanguage(value){
		this._setOptionByName(OptionNames.CurrentLanguage, value);
	},

	flushToStorage(){
		this.get('storage').setItem(StorageKeyNames.options, this.get('options'));
	},

	_getOptionByName(name, defaultValue){
		const options = this.get('options');

		return options.hasOwnProperty(name) ? options[name] : defaultValue;
	},

	_setOptionByName(name, value){
		const options = this.get('options');

		options[name] = value;
		this.flushToStorage();
	}
});
