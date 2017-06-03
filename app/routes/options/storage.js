import Ember from "ember";

export default Ember.Route.extend({
	indexStore: Ember.inject.service('storage/permanent-storage-index'),

	indexChanged: Ember.observer("indexStore.changeTimestamp", function () {
		this.refresh();
	}),

	model(){
		return this.get('indexStore').getIndexes();
	},
	setupController(controller, model) {
		this._super(controller, model);
		controller.resetCheckboxes();
	}
})