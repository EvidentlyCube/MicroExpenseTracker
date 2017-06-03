import Ember from "ember";

export default Ember.Service.extend({
	calculateExpenseData(expenses, categories){
		const expensesPerCategory = this._calculateExpenseData_initializeDataObjects(categories);
		let [totalSum, uncategorizedSum] = this._calculateExpenseData_sumExpenses(expenses, expensesPerCategory);

		this._calculateExpenseData_calculatePercentAndMapObjects(categories, totalSum, expensesPerCategory);

		return [
			totalSum,
			uncategorizedSum,
			Ember.A(Object.values(expensesPerCategory))
		];
	},

	_calculateExpenseData_initializeDataObjects(categories){
		const expensesPerCategory = {};

		categories.forEach(function (category) {
			expensesPerCategory[category.get('id')] = {
				category: category,
				percentFraction: 0,
				sum: 0
			};
		});

		return expensesPerCategory;
	},

	_calculateExpenseData_sumExpenses(expenses, expensesPerCategoryData_out) {
		let totalSum = 0;
		let uncategorizedSum = 0;

		expenses.forEach(function (expense) {
			let category = expense.get('category');
			let isRootCategory = true;

			if (category) {
				while (category) {
					const data = expensesPerCategoryData_out[category.get('id')];
					data.sum += expense.get('realPrice');

					if (isRootCategory) {
						totalSum += expense.get('realPrice');
					}

					category = category.get('parent');
					isRootCategory = false;
				}
			} else {
				uncategorizedSum += expense.get('realPrice');
			}
		});

		return [totalSum, uncategorizedSum];
	},

	_calculateExpenseData_calculatePercentAndMapObjects(categories, totalSum, expensesPerCategory_out) {
		if (totalSum === 0) {
			totalSum = 0.1;
		}

		categories.forEach(function (category) {
			const data = expensesPerCategory_out[category.get('id')];
			data.percentFraction = data.sum / totalSum;

			expensesPerCategory_out[category.get('id')] = Ember.Object.create(data);
		});
	}
});
