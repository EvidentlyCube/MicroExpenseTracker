import {test} from "qunit";
import moduleForAcceptance from "micro-expense-tracker/tests/helpers/module-for-acceptance";
import testSelector from 'ember-test-selectors';

moduleForAcceptance('Acceptance | navigation/warning-icon');

test(`Should not display warning icon by default`, async function (assert) {
	await visit('/categories');

	assert.equal(find(testSelector("id", "date-switcher-warning-icon")).length, 0, "Warning icon should not be visible");
});

test(`Should display warning icon when month is changed`, async function (assert) {
	await visit('/categories');
	await click(testSelector("id", "date-switcher-prev-month"));

	assert.equal(find(testSelector("id", "date-switcher-warning-icon")).length, 1, "Warning icon should be visible");
});
