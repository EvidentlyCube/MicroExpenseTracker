import Ember from "ember";
import RSVP from "rsvp";

export default Ember.Route.extend({
	modelService: Ember.inject.service('dao/dao-all'),
	monthsService: Ember.inject.service(),

	currentMonthChanged: Ember.observer('monthsService.currentMonth', function(){
		this.refresh();
	}),

	model(){
		return RSVP.hash({
			categories: this.get('modelService.category').getAll(),
			expenses: this.get('modelService.expense').getByMonth(this.get('monthsService.currentMonth')),
		});
	}
});
