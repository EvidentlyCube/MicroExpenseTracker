import Ember from "ember";

export default Ember.Component.extend({
	id: "",
	class: "",
	name: "",
	tagName: "select",

	options: [],
	selectedValue: "",
	firstOption: ""
});
