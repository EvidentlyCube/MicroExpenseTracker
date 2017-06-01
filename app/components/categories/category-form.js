import Ember from "ember";

export default Ember.Component.extend({
	categories: [],
	model: {
		id: "",
		name: "",
		parentId: ""
	},

	categoriesData: Ember.computed('categories', function () {
		return this.get('categories')
			.filter(row => row.get('id') !== this.get('model').id)
			.map(function (category) {
				return {
					name: category.get('namePath'),
					value: category.get('id')
				};
			});
	}),

	onSave: () => {
	},
	onCancel: () => {
	},

	getProperties() {
		return {
			id: parseInt(this.$('.category-id').val()),
			name: this.$('.name-input').val(),
			parentId: parseInt(this.$('.parent-id-input').val()) || null
		};
	},

	actions: {
		saveHandler(){
			this.get('onSave')(this.getProperties());

			return false;
		},
		cancelHandler(){
			this.get('onCancel')(this.getProperties());

			return false;
		}
	}
});
