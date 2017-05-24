import Ember from "ember";
import RSVP from "rsvp";

export default Ember.Route.extend({
	store: Ember.inject.service(),
	categoryProvider: Ember.inject.service(),

	model(params){
		return RSVP.hash({
			model: this.get('store').findRecord('category', params.category_id),
			categories: this.get('categoryProvider').getAllSortedByPath()
		});
	}
});
