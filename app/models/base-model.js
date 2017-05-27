import Ember from "ember";

export default Ember.Object.extend({
	modelService: Ember.inject.service('model/model-service'),
	i18n: Ember.inject.service(),

	id: null,
	errors: []
});
