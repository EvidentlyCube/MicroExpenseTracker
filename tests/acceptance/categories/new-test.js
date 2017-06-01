/* eslint-disable */

import {test} from "qunit";
import moduleForAcceptance from "micro-expense-tracker/tests/helpers/module-for-acceptance";
import testSelector from 'ember-test-selectors';

moduleForAcceptance('Acceptance | categories/new');

test('New category is created', async function (assert) {
	assert.equal(this.application.dao.get('category').count(), 0, "Sanity check - there should be no categories yet");

	const CategoryName = "Test Category";

	await visit('/categories/new');
	assert.equal(currentURL(), '/categories/new', "Is inside categories.new route");

	await fillIn(testSelector('id', 'category-form-input-name'), CategoryName);
	await click(testSelector('id', 'category-form-save'));

	assert.equal(this.application.dao.get('category').count(), 1, "One category was created");
});

test('No options in parent select when there are no categories', async function (assert) {
	assert.equal(this.application.dao.get('category').count(), 0, "Sanity check - there should be no categories yet");

	await visit('/categories/new');

	assert.equal(find(testSelector('id', 'category-form-input-parent-id'))[0].children.length, 1);
});

test('Transitions to index after creating category', async function (assert) {
	assert.equal(this.application.dao.get('category').count(), 0, "Sanity check - there should be no categories yet");

	await visit('/categories/new');

	await fillIn(testSelector('id', 'category-form-input-name'), "Whatever");
	await click(testSelector('id', 'category-form-save'));

	assert.equal(currentURL(), '/categories', "Switched to category list after saving category");
});

test('Category is created with parent', async function (assert) {
	assert.equal(this.application.dao.get('category').count(), 0, "Sanity check - there should be no categories yet");
	const parentCategory = this.application.dao.get('category').create({name: "Test Parent"});
	parentCategory.save();

	const CategoryName = "Child Category";

	await visit('/categories/new');
	assert.equal(find(testSelector('id', 'category-form-input-parent-id')).children.length, 2, "The parent category is available for selection");

	await fillIn(testSelector('id', 'category-form-input-name'), CategoryName);
	await fillIn(testSelector('id', 'category-form-input-parent-id'), parentCategory.id);
	await click(testSelector('id', 'category-form-save'));

	const childCategory = this.application.dao.get('category').getAll().pop();
	assert.ok(!!childCategory);
	assert.equal(childCategory.parentId, parentCategory.id);
});
