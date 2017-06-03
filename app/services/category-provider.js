import Ember from "ember";

export default Ember.Service.extend({
	modelDaos: Ember.inject.service('dao/model-daos'),


	getAll(){
		return this.get('modelDaos.category').getAll();
	},

	getAllSortedByPath(){
		const categories = this.getAll();

		categories.sort((left, right) => {
			const rootNameCompare = left.get('rootName').localeCompare(right.get('rootName'));

			if (rootNameCompare === 0) {
				return left.get('namePath').localeCompare(right.get('namePath'));
			} else {
				return rootNameCompare;
			}
		});

		return categories;
	}
});
