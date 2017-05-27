import Ember from "ember";
import DataStorageKeys from "../../constants/storage/key-names";

export default Ember.Service.extend({
	needs: ['model:category'],

	storage: Ember.inject.service('storage/permanent-storage-service'),

	changeTimestamp: null,
	isLoaded: false,
	data: null,

	init(){
		const data = [];
		data.length = 1;

		this.set('data', data);
		this._loadDataIfNeeded();
	},

	create(properties){
		const Category = this._getModelClass();
		const category = Category.create(properties);
		category.set('id', null);
		return category;
	},

	getById(id){
		return this.get('data')[id] || null;
	},

	getAll(){
		return this.get('data').concat().filter(c => c);
	},

	modelSaved(category){
		const data = this.get('data');

		if (category.get('id') === null){
			category.set('id', data.length);
			data[data.length] = category;
		}

		this.flushToStorage();
	},

	modelDeleted(category){
		const data = this.get('data');

		delete data[category.get('id')];

		this.flushToStorage();
	},

	flushToStorage(){
		const storage = this.get('storage');
		const data = this.get('data');
		storage.setItem(this._getStorageKey(), this._toJson(data));
		this.set('changeTimestamp', Date.now());
	},

	_toJson(data){
		const jsonData = [];
		data.forEach(category => jsonData.push(category._toJson()));
		return jsonData;
	},

	_loadDataIfNeeded(){
		if (this.get('isLoaded')){
			return;
		}

		const Category = this._getModelClass();
		const loadedData = this.get('storage').getItem(this._getStorageKey()) || [];
		const data = [];
		data.length = 1;

		loadedData.forEach(row => {
			const category = Category.create(row);
			data[category.get('id')] = category;
		});

		this.set('data', data);
		this.set('isLoaded', true);
	},

	_getStorageKey(){
		return DataStorageKeys.categories;
	},

	_getModelClass(){
		return Ember.getOwner(this).lookup('model:category');
	}
});
