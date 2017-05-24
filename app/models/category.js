import Ember from "ember";
import DS from "ember-data";

export default DS.Model.extend({
	name: DS.attr('string'),
	parent: DS.belongsTo('category', {inverse: null, async: false}),

	indentedName: Ember.computed('name', 'parent', 'parent.name', 'parent.parent', function () {
		let parent = this.get('parent');
		let indent = "";

		while (parent) {
			indent += "&nbsp;-&nbsp;";
			parent = parent.get('parent');
		}

		return indent + this.get('name');
	}),

	namePath: Ember.computed('name', 'parent', 'parent.parent', 'parent.namePath', function () {
		const parent = this.get('parent');

		if (parent) {
			return parent.get('namePath') + " -> " + this.get('name');
		} else {
			return this.get('name');
		}
	}),

	namePathForHtml: Ember.computed('name', 'parent', 'parent.parent', 'parent.namePath', function () {
		const parent = this.get('parent');

		if (parent) {
			return `${parent.get('namePath')} -> <strong>${this.get('name')}</strong>`;
		} else {
			return `<strong>${this.get('name')}</strong>`;
		}
	}),

	rootName: Ember.computed('name', 'parent', 'parent.parent', 'parent.name', 'parent.rootName', function () {
		let name = this.get('name');
		let parent = this.get('parent');

		while (parent) {
			name = parent.get('name');
			parent = parent.get('parent');
		}

		return name;
	}),

	hasChildren: Ember.computed(function () {
		return this.get('store').peekAll('category').filter(cat => cat.get('parent') === this).length > 0;
	}),

	isCategory(category){
		return this === category || (this.get('parent') && this.get('parent').isCategory(category));
	}

});
