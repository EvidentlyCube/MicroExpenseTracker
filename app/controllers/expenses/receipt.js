import Ember from "ember";

export default Ember.Controller.extend({
	i18n: Ember.inject.service(),
	modelDaos: Ember.inject.service('dao/model-daos'),
	modelSaver: Ember.inject.service('expense/model-saver'),
	modelValidator: Ember.inject.service('expense/model-validator'),
	globalNotificationStorage: Ember.inject.service(),

	expenses: Ember.computed.alias('model.expenses'),
	receiptDate: Ember.computed.alias('model.receiptDate'),
	categories: Ember.computed.alias('model.categories'),

	actions: {
		dateChanged(newDate){
			this.set('receiptDate', newDate);
		},

		expenseChanged(index, model){
			let expenses = this.get('expenses');

			this.get('modelValidator').validateModel(model);

			expenses[index] = model;
			if (index === expenses.length - 1) {
				expenses.pushObject(this.get('modelDaos.expense').create());
				this.notifyPropertyChange('expenses');
			}
		},

		saveHandler(){
			const i18n = this.get('i18n');
			const validator = this.get('modelValidator');
			const modelSaver = this.get('modelSaver');
			const globalNotificationStorage = this.get('globalNotificationStorage');
			const expenses = this.get('expenses');

			if (validator.validateModels(expenses)) {
				globalNotificationStorage.addError(i18n.t('section.expenses.notifications.fix_form'), 2000);
			} else {
				modelSaver.saveModels(expenses, this.get('receiptDate')).then(() => {
					globalNotificationStorage.addSuccess(i18n.t('section.expenses.notifications.created_receipt'), 2000);
					this.transitionToRoute('expenses.index');
				});
			}

			return false;
		},

		cancelHandler(){
			this.transitionToRoute('expenses.index');

			return false;
		}
	}
});
