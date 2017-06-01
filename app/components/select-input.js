import Ember from "ember";

export default Ember.Component.extend({
	tagName: "select",
	attributeBindings: ['data-test-id'],

	options: [],
	selectedValue: "",
	firstOption: ""
});
