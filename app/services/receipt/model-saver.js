import Ember from "ember";

export default Ember.Service.extend({
	sanitizer: Ember.inject.service(),
	store: Ember.inject.service(),

	saveModels(models, expenseDate){
		const sanitizer = this.get('sanitizer');
		const store = this.get('store');
		let promises = [];

		models.forEach((model) => {
			if (model.isEmpty()) {
				return;
			}


			const expense = store.createRecord('expense', {
				name: model.name,
				price: sanitizer.parseNumber(model.price),
				discount: sanitizer.parseNumber(model.discount / 100),
				category: model.category,
				purchasedAt: expenseDate,
				createdAt: new Date(),
				updatedAt: new Date()
			});

			promises.push(expense.save());
		});

		return Ember.RSVP.Promise.all(promises);
	}
});
