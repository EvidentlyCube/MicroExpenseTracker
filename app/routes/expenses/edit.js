import Ember from "ember";
import RSVP from "rsvp";

export default Ember.Route.extend({
	modelDaos: Ember.inject.service('dao/model-daos'),
	categoryProvider: Ember.inject.service(),

	model(params){
		const expense = this.get('modelDaos.expense').getById(params.expense_id);
		const categories = this.get('categoryProvider').getAllSortedByPath();
		categories.unshift({});

		return RSVP.hash({
			categories: categories,
			expenseOriginal: expense,
			expenseClone: expense.clone()
		});
	}
});
