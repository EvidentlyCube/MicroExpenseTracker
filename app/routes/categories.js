import Ember from "ember";

export default Ember.Route.extend({
	modelService: Ember.inject.service('model/model-service'),

	model(){
		return this.get('modelService.category').getAll();
	}
});
