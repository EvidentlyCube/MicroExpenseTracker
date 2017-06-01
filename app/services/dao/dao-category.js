import Ember from "ember";
import DataStorageKeys from "../../constants/storage/key-names";

export default Ember.Service.extend({
	storage: Ember.inject.service('storage/permanent-storage-service'),

	changeTimestamp: null,
	isLoaded: false,
	data: null,

	init(){
		const data = [];
		data.length = 1;

		this.set('data', data);
	},

	create(properties){
		const Category = this._getModelClass();
		const category = Category.create(properties);
		category.set('id', null);
		return category;
	},

	getById(id){
		this._loadOptionsIfNeeded();
		return this.get('data')[id] || null;
	},

	getAll(){
		this._loadOptionsIfNeeded();
		return this.get('data').concat().filter(c => c);
	},

	count(){
		this._loadOptionsIfNeeded();
		return this.getAll().length;
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

	clearMemory(){
		this.set('isLoaded', false);
		this.set('data', []);
		this.set('changeTimestamp', Date.now());
	},

	_toJson(data){
		const jsonData = [];
		data.forEach(category => jsonData.push(category.toJson()));
		return jsonData;
	},

	_loadOptionsIfNeeded(){
		if (this.get('isLoaded')){
			return;
		}

		const Category = this._getModelClass();
		const loadedData = this.get('storage').getItem(this._getStorageKey()) || [];
		const data = [];
		data.length = 1;

		loadedData.forEach(row => {
			const category = Category.create(row);
			category.afterLoad();
			data[category.get('id')] = category;
		});

		this.set('data', data);
		this.set('isLoaded', true);
		this.set('changeTimestamp', Date.now());
	},

	_getStorageKey(){
		return DataStorageKeys.categories;
	},

	_getModelClass(){
		return Ember.getOwner(this).lookup('model:category');
	}
});
