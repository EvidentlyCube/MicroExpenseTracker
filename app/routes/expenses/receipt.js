import Ember from "ember";
import RSVP from "rsvp";

export default Ember.Route.extend({
	modelService: Ember.inject.service('model/model-service'),
	categoryProvider: Ember.inject.service(),

	model(){
		const expenseService = this.get('modelService.expense');
		const categories = this.get('categoryProvider').getAllSortedByPath();
		categories.unshift({});

		return RSVP.hash({
			receiptDate: new Date(),
			categories: categories,
			expenses: Ember.A([
				expenseService.create(),
				expenseService.create()
			])
		});
	}
});
