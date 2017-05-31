import Ember from "ember";
import LanguageOptions from '../constants/options/language-options';

const Currencies = Ember.A([
	{
		value: "$~~PRICE~~",
		display: "$54.20"
	},
	{
		value: "~~PRICE~~ zł",
		display: "54.20 zł"
	}
]);

export default Ember.Controller.extend({
	i18n: Ember.inject.service(),
	optionsService: Ember.inject.service(),
	optionsLanguage: null,
	optionsCurrencies: null,

	selectedCurrency: null,

	init(){
		this.set("optionsLanguage", LanguageOptions);
		this.set("optionsCurrencies", Currencies);
		this.set("selectedCurrency", this.get('optionsService').getCurrencyDisplay());
	},

	actions: {
		handleLanguageChanged(language){
			this.set('i18n.locale', language);
			this.get('optionsService').setCurrentLanguage(language);
			document.title = this.get('i18n').t('app.page_title');
		},

		handleCurrencyChanged(currency){
			this.get('optionsService').setCurrencyDisplay(currency);
		},

		start(){
			this.get("optionsService").setInstallationFinished(true);
			this.transitionToRoute('/categories');
		}

	}
});
