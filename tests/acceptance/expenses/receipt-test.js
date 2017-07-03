import {test} from "qunit";
import moduleForAcceptance from "micro-expense-tracker/tests/helpers/module-for-acceptance";
import { openDatepicker } from 'ember-pikaday/helpers/pikaday';

moduleForAcceptance('Acceptance | categories/new');

['01-2015', '10-2010', '07-2025'].forEach(function (data) {
	const [month, year] = data.split('-');
	test(`Default receipt purchase date depends on current month (case: ${data})`, async function (assert) {
		const monthsService = this.application.monthsService;
		const newMonthObject = monthsService.getMonthObject(year, month);
		monthsService.set('selectedMonth', newMonthObject);

		await visit('/expenses/receipt');

		const datePicker = openDatepicker(find("#receipt-form-receipt-date-picker"));
		assert.equal(datePicker.selectedYear(), newMonthObject.get('year'));
		assert.equal(datePicker.selectedMonth(), newMonthObject.get('month'));
	});
});
