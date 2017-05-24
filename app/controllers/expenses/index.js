import Ember from "ember";

export default Ember.Controller.extend({
	i18n: Ember.inject.service(),
	globalNotificationStorage: Ember.inject.service(),
	store: Ember.inject.service(),
	monthsService: Ember.inject.service(),

	expenses: Ember.computed.alias('model'),
	currentMonth: null,

	sortCriteria: ['purchasedAt:desc', 'createdAt:desc'],
	sortedExpenses: Ember.computed.sort('model', 'sortCriteria'),
	filteredExpenses: Ember.computed.filter('sortedExpenses', function (expense) {
		return expense.get('purchasedAt') >= this.get('currentMonth.startDate')
			&& expense.get('purchasedAt') <= this.get('currentMonth.endDate');
	}),

	init(){
		this.set('currentMonth', this.get('monthsService').getCurrentMonthObject());
	},

	actions: {
		deleteExpense(id){
			this.get('store').find('expense', id).then((model) => {
				return model.destroyRecord({});
			}).then((model) => {
				const i18n = this.get('i18n');
				const globalNotificationStorage = this.get('globalNotificationStorage');
				const message = i18n.t('section.expenses.notifications.deleted', {
					name: model.get('name')
				});

				globalNotificationStorage.addWarning(message, 4000);
			});
			return false;
		},

		switchMonth(delta){
			const currentMonth = this.get('currentMonth');
			const monthsService = this.get('monthsService');

			this.set('currentMonth', monthsService.getMonthObjectByDelta(currentMonth, delta));
			this.notifyPropertyChange('filteredExpenses');
		}
	}
});
