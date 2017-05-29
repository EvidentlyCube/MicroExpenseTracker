import {findAll} from 'ember-native-dom-helpers';

export default function(categoryName, parentId, assert, context) {
	return (function () {
		const value = {
			id: 0,
			name: categoryName,
			parentId: parentId
		};
		const returnObject = {v: value};

		visit('/categories');
		click('.action-new-category');

		andThen(function() {
			assert.equal(currentURL(), '/categories/new', 'We are in categories.new');
			fillIn('.name-input', categoryName);
			click('.action-save');
		});

		andThen(function(){
			const categories = Array.from(findAll('.category-row'));

			categories.forEach(category => {
				const id = parseInt(category.getAttribute('data-id'));

				value.id = Math.max(value.id, id);
			})
		});


		return returnObject;
	}).call(context);
}