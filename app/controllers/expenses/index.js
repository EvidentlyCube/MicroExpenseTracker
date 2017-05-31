import Ember from "ember";

export default Ember.Controller.extend({
	queryParams: [{filterCategoryId: 'filter-category-id'}],

	i18n: Ember.inject.service(),
	globalNotificationStorage: Ember.inject.service(),
	modelDaos: Ember.inject.service('dao/model-daos'),
	store: Ember.inject.service(),
	monthsService: Ember.inject.service(),

	filterCategoryId: null,
	filterCategory: Ember.computed('filterCategoryId', function(){
		return this.get('modelDaos.category').getById(this.get('filterCategoryId'));
	}),

	expenses: Ember.computed.alias('model'),

	sortCriteria: ['purchasedAt:desc', 'createdAt:desc'],
	isFiltered: Ember.computed('filterCategoryId', function(){
		return this.get('filterCategory');
	}),
	filteredExpenses: Ember.computed.filter('model.expenses', function(expense){
		const filterCategory = this.get('filterCategory');

		if (filterCategory && filterCategory !== expense.get('category') && !filterCategory.isParentOf(expense.get('category'))){
			return false;
		}

		return true;
	}).property('model.expenses', 'modelDaos.expense.changeTimestamp', 'filterCategoryId'),

	sortedExpenses: Ember.computed.sort('filteredExpenses', 'sortCriteria'),

	actions: {
		deleteExpense(id){
			const model = this.get('modelDaos.expense').getById(id);
			model.delete();

			const i18n = this.get('i18n');
			const globalNotificationStorage = this.get('globalNotificationStorage');
			const message = i18n.t('section.expenses.notifications.deleted', {
				name: model.get('name')
			});

			globalNotificationStorage.addWarning(message, 4000);
			return false;
		},

		removeFilter(name){
			this.set(name, null);
		}
	}
});
