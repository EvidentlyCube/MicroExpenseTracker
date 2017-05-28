import Ember from "ember";

export default Ember.Controller.extend({
	// queryParams: ['category'],

	i18n: Ember.inject.service(),
	globalNotificationStorage: Ember.inject.service(),
	modelService: Ember.inject.service('dao/dao-all'),
	store: Ember.inject.service(),
	monthsService: Ember.inject.service(),

	expenses: Ember.computed.alias('model'),
	currentMonth: Ember.computed.alias('monthsService.currentMonth'),

	sortCriteria: ['purchasedAt:desc', 'createdAt:desc'],
	sortedExpenses: Ember.computed.sort('model.expenses', 'sortCriteria'),

	actions: {
		deleteExpense(id){
			const model = this.get('modelService.expense').getById(id);
			model.delete();

			const i18n = this.get('i18n');
			const globalNotificationStorage = this.get('globalNotificationStorage');
			const message = i18n.t('section.expenses.notifications.deleted', {
				name: model.get('name')
			});

			globalNotificationStorage.addWarning(message, 4000);
			return false;
		},

		resetMonth(){
			const currentMonth = this.get('monthsService').getCurrentMonthObject();
			this.transitionToRoute(`/expenses/index/${currentMonth.get('year')}/${currentMonth.get('month')+1}`);
		},

		switchMonth(delta){
			const currentMonth = this.get('currentMonth');
			const newMonth = this.get('monthsService').getMonthObjectByDelta(currentMonth, delta);

			this.transitionToRoute(`/expenses/index/${newMonth.get('year')}/${newMonth.get('month')+1}`);
		}
	}
});
