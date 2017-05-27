import Ember from "ember";
import RSVP from "rsvp";

export default Ember.Route.extend({
	modelService: Ember.inject.service('model/model-service'),
	categoryProvider: Ember.inject.service(),

	model(params){
		return RSVP.hash({
			model: this.get('modelService.expense').getById(params.expense_id),
			categories: this.get('categoryProvider').getAllSortedByPath()
		});
	}
});
