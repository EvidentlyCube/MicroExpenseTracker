import Ember from "ember";

export default Ember.Controller.extend({
	i18n: Ember.inject.service(),
	optionsService: Ember.inject.service(),
	monthsService: Ember.inject.service(),

	selectedMonth: Ember.computed.alias('monthsService.selectedMonth'),

	init(){
		this.set('i18n.locale', this.get('optionsService').getCurrentLanguage());
		document.title = this.get('i18n').t('app.page_title');
	},

	actions: {
		selectedMonthChanged(newMonth){
			this.set('selectedMonth', newMonth);
		}
	}
});
