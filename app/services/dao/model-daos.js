import Ember from "ember";

export default Ember.Service.extend({
	category: Ember.inject.service('dao/dao-category'),
	expense: Ember.inject.service('dao/dao-expense')
});
