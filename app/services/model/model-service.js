import Ember from "ember";

export default Ember.Service.extend({
	category: Ember.inject.service('model/model-service-category'),
	expense: Ember.inject.service('model/model-service-expense')
});
