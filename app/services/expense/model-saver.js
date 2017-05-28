import Ember from "ember";

export default Ember.Service.extend({
	utils: Ember.inject.service('expense/model-utils'),
	sanitizer: Ember.inject.service(),
	modelService: Ember.inject.service('dao/dao-all'),

	saveModels(models, expenseDate){
		let promises = [];

		models.forEach((model) => {
			if (this.get('utils').isEmpty(model)) {
				return;
			}

			model.set('purchasedAt', expenseDate);
			model.set('createdAt', expenseDate);
			model.set('updatedAt', expenseDate);

			model.save();
		});

		return Ember.RSVP.Promise.all(promises);
	}
});
