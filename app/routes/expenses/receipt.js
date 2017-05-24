import Ember from "ember";

export default Ember.Route.extend({
	categoryProvider: Ember.inject.service(),

	model(){
		return this.get('categoryProvider').getAllSortedByPath();
	},

	setupController(controller, model){
		this._super(controller, model);

		controller.resetModel();
	}
});
