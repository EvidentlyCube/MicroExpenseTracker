import Ember from "ember";
import RSVP from "rsvp";

export default Ember.Route.extend({
	modelDaos: Ember.inject.service('dao/model-daos'),
	monthsService: Ember.inject.service(),

	selectedMonthChanged: Ember.observer('monthsService.selectedMonth', function () {
		this.refresh();
	}),

	expensesChanged: Ember.observer('modelDaos.expense.changeTimestamp', function () {
		this.refresh();
	}),

	model(){
		return RSVP.hash({
			categories: this.get('modelDaos.category').getAll(),
			expenses: this.get('modelDaos.expense').getByMonth(this.get('monthsService.selectedMonth'))
		});
	},

	resetController(controller, isExiting) {
		if (isExiting) {
			controller.set('filterCategoryId', null);
		}
	}
});
