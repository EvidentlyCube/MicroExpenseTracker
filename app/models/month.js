import Ember from "ember";

export default Ember.Object.extend({
	startDate: null,
	endDate: null,
	year: null,
	month: null,

	displayMonth: Ember.computed('month', function () {
		return this.get('month') + 1;
	})
});
