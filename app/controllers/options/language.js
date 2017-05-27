import Ember from 'ember';
import LanguageOptions from '../../constants/options/language-options';

export default Ember.Controller.extend({
	i18n: Ember.inject.service(),
	optionsService: Ember.inject.service(),

	options: null,

	init(){
		this.set("options", LanguageOptions);
	},

	actions: {
		handleLanguageChanged(language){
			this.set('i18n.locale', language);
			this.get('optionsService').setCurrentLanguage(language);
			document.title = this.get('i18n').t('app.page_title');
		}
	}
});
