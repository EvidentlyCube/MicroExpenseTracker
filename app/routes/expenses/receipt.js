import Ember from "ember";
import RSVP from "rsvp";
import moment from "moment";

export default Ember.Route.extend({
	modelDaos: Ember.inject.service('dao/model-daos'),
	monthsService: Ember.inject.service(),
	categoryProvider: Ember.inject.service(),

	model(){
		const expenseService = this.get('modelDaos.expense');
		const categories = this.get('categoryProvider').getAllSortedByPath();
		categories.unshift({});

		return RSVP.hash({
			receiptDate: this.generateReceiptDate(),
			categories: categories,
			expenses: Ember.A([
				expenseService.create(),
				expenseService.create()
			])
		});
	},

	generateReceiptDate(){
		const selectedMonthObj = this.get('monthsService.selectedMonth');
		const date = moment();

		date.month(selectedMonthObj.get('month'));
		date.year(selectedMonthObj.get('year'));

		return date.toDate();
	}
});
