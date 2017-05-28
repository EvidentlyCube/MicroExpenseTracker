import Ember from "ember";
import BaseModel from "./base-model";

export default BaseModel.extend({
	name: null,
	parentId: null,

	parent: Ember.computed('parentId', function(){
		return this.get('modelDaos.category').getById(this.get('parentId'));
	}),

	indentedName: Ember.computed('name', 'parentId', 'parent.indentedName', function () {
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

		if (parent && parent.get('id')) {
			return parent.get('namePath') + " -> " + this.get('name');
		} else {
			return this.get('name');
		}
	}),

	namePathForHtml: Ember.computed('name', 'parent', 'parent.parent', 'parent.namePath', function () {
		const parent = this.get('parent');

		if (parent && parent.get('id')) {
			return `${parent.get('namePath')} -> <strong>${this.get('name')}</strong>`;
		} else {
			return `<strong>${this.get('name')}</strong>`;
		}
	}),

	rootName: Ember.computed('name', 'parent', 'parent.parent', 'parent.name', 'parent.rootName', function () {
		let name = this.get('name');
		let parent = this.get('parent');

		while (parent && parent.get('id')) {
			name = parent.get('name');
			parent = parent.get('parent');
		}

		return name;
	}),

	hasChildren: Ember.computed(function () {
		return this.getChildren().length > 0;
	}),

	getChildren(){
		return this.get('modelDaos.category').getAll().filter(category => category.get('parentId') === this.get('id'));
	},

	isCategory(category){
		return this === category || (this.get('parent.id') && this.get('parent').isCategory(category));
	},

	isChildOf(category){
		const parent = this.get('parent');

		return category && parent && (parent === category || parent.isChildOf(category));
	},

	delete(){
		this.getChildren().forEach(category => {
			category.set('parentId', this.get('parentId'));
			category.save();
		});

		this._super();
	},

	toJson(){
		return {
			id: this.get('id'),
			name: this.get('name'),
			parentId: this.get('parentId')
		};
	},

	_getSpecificService(){
		return this.get('modelDaos.category');
	}
});
