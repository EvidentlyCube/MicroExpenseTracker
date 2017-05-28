import Ember from "ember";

export default Ember.Route.extend({
	modelService: Ember.inject.service('dao/dao-all'),

	model(){
		return this.get('modelService.category').getAll();
	}
});
