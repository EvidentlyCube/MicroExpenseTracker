import Ember from "ember";
import RSVP from "rsvp";

export default Ember.Route.extend({
	store: Ember.inject.service(),

	model(){
		return RSVP.hash({
			categories: this.get('store').findAll('category'),
			expenses: this.get('store').findAll('expense')
		});
	},

	setupController(controller, post) {
		this._super(controller, post);

		controller.resetSummaryData();
	},
});
