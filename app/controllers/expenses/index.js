import Ember from "ember";
import constants from "../../constants/constants";

const ExpensesPerPage = constants.ExpensesPerPage;

export default Ember.Controller.extend({
	queryParams: [{
		filterCategoryId: 'filter-category-id',
		page: 'page'
	}],

	i18n: Ember.inject.service(),
	globalNotificationStorage: Ember.inject.service(),
	modelDaos: Ember.inject.service('dao/model-daos'),
	store: Ember.inject.service(),
	monthsService: Ember.inject.service(),

	filterCategoryId: null,
	page: 0,
	expenses: Ember.computed('model', function(){
		return this.get('model.expenses');
	}),
	maxPage: Ember.computed('expenses', function(){
		return Math.max(0, Math.floor((this.get('expenses').length - 1) / ExpensesPerPage));
	}),
	safePage: Ember.computed('expenses', 'page', 'maxPage', function(){
		return Math.min(this.get('page'), this.get('maxPage'));
	}),

	filterCategory: Ember.computed('filterCategoryId', function () {
		return this.get('modelDaos.category').getById(this.get('filterCategoryId'));
	}),

	isFiltered: Ember.computed('filterCategoryId', function () {
		return this.get('filterCategory');
	}),

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
