import Ember from "ember";

export default Ember.Route.extend({
	modelDaos: Ember.inject.service('dao/model-daos'),

	model(){
		return this.get('modelDaos.category').getAll();
	}
});
