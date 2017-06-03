import Ember from "ember";

export default Ember.Controller.extend({
	modelDaos: Ember.inject.service('dao/model-daos'),
	monthsService: Ember.inject.service(),
	summaryService: Ember.inject.service(),

	totalSum: 0,
	uncategorizedSum: 0,
	expensesPerCategory: null,

	modelChanged: Ember.observer('model', function () {
		this.resetSummaryData();
	}),


	resetSummaryData(){
		let [totalSum, uncategorizedSum, expensesPerCategory] = this.get('summaryService').calculateExpenseData(
			this.get('model.expenses'),
			this.get('model.categories')
		);

		expensesPerCategory = expensesPerCategory.sortBy('category.namePath');

		this.set('totalSum', totalSum);
		this.set('uncategorizedSum', uncategorizedSum);
		this.set('expensesPerCategory', expensesPerCategory);
	}
});
