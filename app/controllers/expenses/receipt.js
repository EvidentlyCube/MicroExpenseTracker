import Ember from "ember";
import ExpenseEditorData from "../../frontend-data/expense-editor-data";

export default Ember.Controller.extend({
	i18n: Ember.inject.service(),
	modelSaver: Ember.inject.service('receipt/model-saver'),
	modelValidator: Ember.inject.service('receipt/model-validator'),
	globalNotificationStorage: Ember.inject.service(),

	expenses: null,
	receiptDate: new Date(),

	expenseCategories: Ember.computed.alias('model', function () {
		let newList = this.get('model');
		newList.unshift({});

		return newList;
	}),

	resetModel(){
		this.set('receiptDate', new Date());
		this.set('expenses', Ember.A([
			ExpenseEditorData.create(),
			ExpenseEditorData.create()
		]));
	},

	actions: {
		dateChanged(newDate){
			this.set('receiptDate', newDate);
		},

		expenseChanged(index, model){
			let expenses = this.get('expenses');

			this.get('modelValidator').validateModel(model);

			expenses[index] = model;
			if (index === expenses.length - 1) {
				expenses.pushObject(new ExpenseEditorData());
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
		}
	}
});
