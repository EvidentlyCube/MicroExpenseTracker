import {test} from "qunit";
import {settings, find, findAll} from 'ember-native-dom-helpers';
import moduleForAcceptance from "micro-expense-tracker/tests/helpers/module-for-acceptance";
import actions from "../helpers/acceptance-helpers/collection";

settings.rootElement = '#met-application';

moduleForAcceptance('Acceptance | category workflow', {
	beforeEach: function(){
		localStorage.clear();
	}
});

const CategoryNameFirst = "Test category";
const CategoryNameSecond = "Renamed category";

test('Asserting category workflow: create -> edit -> delete', function (assert) {
	actions.install.skipInstall(this);

	andThen(function () {
		assert.equal(currentURL(), '/categories', 'We are in categories.index after going through install screen');
		assert.equal(findAll('.category-row').length, 0, 'There are no categories yet');
	});

	const category = actions.category.addCategory(CategoryNameFirst, null, assert, this);

	andThen(function(){
		assert.equal(currentURL(), '/categories', 'We are in categories.index after creating category');
		assert.equal(findAll('.category-row').length, 1, 'There is one category in the list');

		click(`.action-edit`);
	});

	andThen(function(){
		assert.equal(currentURL(), `/categories/edit/${category.v.id}`, 'We are editing the created category');
		assert.equal(find('.category-id').getAttribute('value'), category.v.id, "The hidden ID field is set to the category's id");

		fillIn('.name-input', CategoryNameSecond);
		click('.action-save');
	});

	andThen(function(){
		assert.equal(currentURL(), '/categories', "We are in categories.index after saving edit");
		assert.equal(findAll('.category-row').length, 1, 'There is still one category');

		const categoryRow = find(`.category-row-${category.v.id}`);
		assert.ok(!!categoryRow, "We have found the category we've previously edited");

		const name = find('.category-name', categoryRow).innerHTML;

		assert.ok(name.indexOf(CategoryNameFirst) === -1, "Old name is not displayed");
		assert.ok(name.indexOf(CategoryNameSecond) >= 0, "New name is displayed");

		click('.action-remove', categoryRow);
	});
	andThen(function(){
		assert.equal(currentURL(), '/categories', 'We are in categories.index after removing category');
		assert.equal(findAll('.category-row').length, 0, "No categories can be found");
	});
});
