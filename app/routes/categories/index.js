import Ember from "ember";

export default Ember.Route.extend({
	modelService: Ember.inject.service('model/model-service'),

	categoryChanged: Ember.observer('modelService.category.changeTimestamp', function(){
		this.refresh();
	}),

	model(){
		return this.get('modelService.category').getAll();
	}
});
