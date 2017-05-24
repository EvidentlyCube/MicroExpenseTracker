import Ember from "ember";
import DS from "ember-data";

export default DS.Model.extend({
	startDate: DS.attr('date'),
	endDate: DS.attr('date'),
	year: DS.attr('number'),
	month: DS.attr('number'),

	displayMonth: Ember.computed('month', function () {
		return this.get('month') + 1;
	})
});
