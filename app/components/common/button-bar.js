import Ember from "ember";

export default Ember.Component.extend({
	options: null,
	value: null,
	onClick: null,

	actions: {
		handleClicked(value){
			this.set('value', value);
			this.sendAction('action', value);
		}
	}
});
