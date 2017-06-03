import Ember from "ember";
import OptionNames from "../constants/options/option-names";
import StorageKeyNames from "../constants/storage/key-names";

export default Ember.Service.extend({
	i18n: Ember.inject.service(''),
	storage: Ember.inject.service("storage/permanent-storage-service"),

	changeTimestamp: null,
	isLoaded: false,
	options: null,

	getInstallationFinished(){
		return this._getOptionByName(OptionNames.InstallationFinished, false);
	},

	setInstallationFinished(value){
		this._setOptionByName(OptionNames.InstallationFinished, value);
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
		this.set('changeTimestamp', Date.now());
	},

	clearMemory(){
		this.set('isLoaded', false);
		this.set('options', {});
		this.set('changeTimestamp', Date.now());
	},

	_loadOptionsIfNeeded(){
		if (this.get('isLoaded')) {
			return;
		}

		const options = this.get('storage').getItem(StorageKeyNames.options) || {};

		this.set('options', options);
		this.set('isLoaded', true);
		this.set('changeTimestamp', Date.now());
	},

	_getOptionByName(name, defaultValue){
		this._loadOptionsIfNeeded();
		const options = this.get('options');

		return options.hasOwnProperty(name) ? options[name] : defaultValue;
	},

	_setOptionByName(name, value){
		this._loadOptionsIfNeeded();
		const options = this.get('options');

		options[name] = value;
		this.flushToStorage();
	}
});
