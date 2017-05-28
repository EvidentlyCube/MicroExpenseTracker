import Ember from "ember";

export default Ember.Component.extend({
	tagName: '',

	row: null,
	onDeleteCategory: null,

	actions: {
		deleteCategory(id){
			this.get('onDeleteCategory')(id);
		}
	}
});