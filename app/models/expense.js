import Ember from "ember";

export default Ember.Object.extend({
	modelService: Ember.inject.service('model/model-service'),
	i18n: Ember.inject.service(),

	id: null,
	name: null,
	price: null,
	discount: 0,
	purchasedAt: null,
	createdAt: null,
	updatedAt: null,
	categoryId: null,

	category: Ember.computed('categoryId', function(){
		return this.get('modelService.category').getById(this.get('categoryId'));
	}),

	idIndex: Ember.computed('id', function(){
		return parseInt(this.get('id').split('-')[2]);
	}),

	realPrice: Ember.computed('price', 'discount', function () {
		return this.get('price') * (1 - this.get('discount'));
	}),

	save(){
		this.get('modelService.expense').modelSaved(this);
	},

	delete(){
		this.get('modelService.expense').modelDeleted(this);
	},

	afterLoad(){
		this.set('purhasedAt', new Date(this.get('purchasedAt')));
		this.set('createdAt', new Date(this.get('createdAt')));
		this.set('updatedAt', new Date(this.get('updatedAt')));
	},

	_toJson(){
		return {
			id: this.get('id'),
			name: this.get('name'),
			price: this.get('price'),
			discount: this.get('discount'),
			purchasedAt: this.get('purchasedAt').valueOf(),
			createdAt: this.get('createdAt').valueOf(),
			updatedAt: this.get('updatedAt').valueOf(),
			categoryId: this.get('categoryId')
		};
	}
});
