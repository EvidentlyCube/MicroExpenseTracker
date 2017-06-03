import Ember from "ember";

export default Ember.Route.extend({
	modelDaos: Ember.inject.service('dao/model-daos'),

	categoryChanged: Ember.observer('modelDaos.category.changeTimestamp', function () {
		this.refresh();
	}),

	model(){
		return this.get('modelDaos.category').getAll();
	}
});
