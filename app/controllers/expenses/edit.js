import Ember from "ember";

export default Ember.Controller.extend({
	i18n: Ember.inject.service(),
	modelService: Ember.inject.service('model/model-service'),
	modelSaver: Ember.inject.service('expense/model-saver'),
	modelValidator: Ember.inject.service('expense/model-validator'),
	globalNotificationStorage: Ember.inject.service(),

	expense: Ember.computed.alias('model.expenseClone'),
	expenseOriginal: Ember.computed.alias('model.expenseOriginal'),
	categories: Ember.computed.alias('model.categories'),

	actions: {
		dateChanged(newDate){
			this.set('expense.purchasedAt', newDate);
		},

		expenseChanged(index, model){
			this.get('modelValidator').validateModel(model);
		},

		saveHandler(){
			const i18n = this.get('i18n');
			const validator = this.get('modelValidator');
			const globalNotificationStorage = this.get('globalNotificationStorage');
			const clone = this.get('expense');
			const expense = this.get('model.expenseOriginal');

			if (validator.validateModel(clone)) {
				globalNotificationStorage.addError(i18n.t('section.expenses.notifications.fix_form'), 2000);
			} else {
				expense.setFieldsFrom(clone, ['name', 'price', 'discount', 'purchasedAt', 'categoryId']);
				expense.set('dateUpdated', new Date());
				expense.save();

				globalNotificationStorage.addSuccess(i18n.t('section.expenses.notifications.modified_expense'), 2000);
				this.transitionToRoute('expenses.index');
			}

			return false;
		},

		cancelHandler(){
			this.transitionToRoute('expenses.index');

			return false;
		}
	}
});
