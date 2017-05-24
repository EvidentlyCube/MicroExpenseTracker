import Ember from "ember";

export default Ember.Controller.extend({
	i18n: Ember.inject.service(),
	optionsService: Ember.inject.service(),

	init(){
		const locale = this.get('i18n.locale');
		this.set('i18n.locale', this.get('optionsService').getCurrentLanguage());
	},

	actions: {
		switchToPolish(){
			this.set('i18n.locale', 'pl');
		},
		switchToEnglish(){
			this.set('i18n.locale', 'en');
		}
	}
});
