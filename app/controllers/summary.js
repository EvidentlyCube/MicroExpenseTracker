import Ember from "ember";

export default Ember.Controller.extend({
	monthsService: Ember.inject.service(),
	summaryService: Ember.inject.service(),

	expenses: Ember.computed.alias('model.expenses'),
	categories: Ember.computed.alias('model.categories'),
	currentMonth: null,

	totalSum: 0,
	uncategorizedSum: 0,
	expensesPerCategory: null,
	filteredExpenses: Ember.computed.filter('expenses', function (expense) {
		return expense.get('purchasedAt') >= this.get('currentMonth.startDate')
			&& expense.get('purchasedAt') <= this.get('currentMonth.endDate');
	}),

	init(){
		this.set('currentMonth', this.get('monthsService').getCurrentMonthObject());
	},

	resetSummaryData(){
		let [totalSum, uncategorizedSum, expensesPerCategory] = this.get('summaryService').calculateExpenseData(
			this.get('filteredExpenses'),
			this.get('categories')
		);

		expensesPerCategory = expensesPerCategory.sortBy('category.namePath');

		this.set('totalSum', totalSum);
		this.set('uncategorizedSum', uncategorizedSum);
		this.set('expensesPerCategory', expensesPerCategory);
	},

	actions: {
		switchMonth(delta){
			const currentMonth = this.get('currentMonth');
			const monthsService = this.get('monthsService');

			this.set('currentMonth', monthsService.getMonthObjectByDelta(currentMonth, delta));
			this.notifyPropertyChange('expenses');
			this.resetSummaryData();
		}
	}
});
