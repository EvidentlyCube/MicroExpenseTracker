import Ember from "ember";
import BaseModel from "./base-model";

export default BaseModel.extend({
	i18n: Ember.inject.service(),

	id: null,
	name: "",
	price: null,
	discount: 0,
	categoryId: null,
	purchasedAt: null,
	createdAt: null,
	updatedAt: null,

	errors: [],

	category: Ember.computed('categoryId', function(){
		return this.get('modelService.category').getById(this.get('categoryId'));
	}),

	idIndex: Ember.computed('id', function(){
		return parseInt(this.get('id').split('-')[2]);
	}),

	realPrice: Ember.computed('price', 'discount', function () {
		return this.get('price') * (1 - this.get('discount'));
	}),

	discountPercent: Ember.computed('discount', function(){
		return Math.round(this.get('discount') * 100);
	}),

	save(){
		this.get('modelService.expense').modelSaved(this);
	},

	delete(){
		this.get('modelService.expense').modelDeleted(this);
	},

	afterLoad(){
		this.set('purchasedAt', new Date(this.get('purchasedAt')));
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
	},

	_getSpecificService(){
		return this.get('modelService.expense');
	}
});
