import Ember from "ember";

export default Ember.Service.extend({
	sanitizer: Ember.inject.service(),
	modelService: Ember.inject.service('model/model-service'),

	saveModels(models, expenseDate){
		const sanitizer = this.get('sanitizer');
		const expenseService = this.get('modelService.expense');
		let promises = [];

		models.forEach((model) => {
			if (model.isEmpty()) {
				return;
			}

			const expense = expenseService.create({
				name: model.name,
				price: sanitizer.parseNumber(model.price),
				discount: sanitizer.parseNumber(model.discount / 100),
				categoryId: model.category.get('id'),
				purchasedAt: expenseDate,
				createdAt: new Date(),
				updatedAt: new Date()
			});

			expense.save();
		});

		return Ember.RSVP.Promise.all(promises);
	}
});
