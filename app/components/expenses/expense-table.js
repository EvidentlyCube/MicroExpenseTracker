import Ember from 'ember';
import constants from '../../constants/constants';

const ExpensesPerPage = constants.ExpensesPerPage;

export default Ember.Component.extend({
	tagName: '',

	expenses: [],
	filterCategoryId: null,
	page: 0,

	sortCriteria: ['purchasedAt:desc', 'createdAt:desc'],

	filteredExpenses: Ember.computed.filter('expenses', function (expense) {
		const filterCategory = this.get('filterCategory');

		if (filterCategory && filterCategory !== expense.get('category') && !filterCategory.isParentOf(expense.get('category'))) {
			return false;
		}

		return true;
	}),

	sortedExpenses: Ember.computed.sort('filteredExpenses', 'sortCriteria'),
	pagedExpenses: Ember.computed('sortedExpenses', 'page', function(){
		const from = this.get('page') * ExpensesPerPage;
		const to = from + ExpensesPerPage;
		return this.get('sortedExpenses').slice(from, to);
	}),
});
