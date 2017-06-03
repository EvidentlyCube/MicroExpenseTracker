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
		const currentMonthObj = this.get('monthsService.currentMonth');
		const date = moment();

		date.month(currentMonthObj.get('month'));
		date.year(currentMonthObj.get('year'));

		return date.toDate();
	}
});
