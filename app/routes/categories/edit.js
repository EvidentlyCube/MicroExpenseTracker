import Ember from "ember";
import RSVP from "rsvp";

export default Ember.Route.extend({
	modelDaos: Ember.inject.service('dao/model-daos'),
	categoryProvider: Ember.inject.service(),

	model(params){
		const currentCategory = this.get('modelDaos.category').getById(params.category_id);
		return RSVP.hash({
			model: currentCategory,
			categories: this.get('categoryProvider').getAllSortedByPath().filter(category => !category.isChildOf(currentCategory))
		});
	}
});
