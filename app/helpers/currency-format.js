import Ember from "ember";

export default Ember.Helper.extend({
	optionsService: Ember.inject.service(''),

	compute([value]) {
		let display = this.get('optionsService').getCurrencyDisplay();
		return display.replace(/~~PRICE~~/g, value.toFixed(2));
	}
});