import Ember from 'ember';
import LanguageOptions from '../../constants/options/language-options';

export default Ember.Controller.extend({
	i18n: Ember.inject.service(),
	optionsService: Ember.inject.service(),

	optionsLanguage: null,

	currencyPrefix: "",
	currencySuffix: "",

	refreshData(){
		const currencyDisplay = this.get('optionsService').getCurrencyDisplay();
		const currencySegments = currencyDisplay.split('~~PRICE~~');
		const prefix = currencySegments.shift();
		const suffix = currencySegments.join("~~PRICE~~");

		this.set("optionsLanguage", LanguageOptions);
		this.set("currencyPrefix", prefix);
		this.set("currencySuffix", suffix);
	},

	saveCurrencyDisplay(){
		const prefix = this.get('currencyPrefix');
		const suffix = this.get('currencySuffix');

		this.get('optionsService').setCurrencyDisplay(`${prefix}~~PRICE~~${suffix}`);
	},

	actions: {
		handleLanguageChanged(language){
			this.set('i18n.locale', language);
			this.get('optionsService').setCurrentLanguage(language);
			document.title = this.get('i18n').t('app.page_title');
		},

		handlePrefixChanged(event){
			this.set('currencyPrefix', event.target.value);
			this.saveCurrencyDisplay();
		},

		handleSuffixChanged(suffix){
			this.set('currencySuffix', event.target.value);
			this.saveCurrencyDisplay();
		}
	}
});
