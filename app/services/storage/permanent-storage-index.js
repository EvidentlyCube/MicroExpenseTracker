import Ember from "ember";
import DataStorageKeys from "../../constants/storage/key-names";
import moment from "moment";

export default Ember.Service.extend({
	storage: Ember.inject.service('storage/permanent-storage-service'),

	data: [],
	isLoaded: false,

	storeIndex(key){
		const data = this.get('data');
		this._loadDataIfNeeded();
		if (data.indexOf(key) === -1){
			return;
		}

		data.push(key);
		this.flushToStorage();
	},

	getIndexes(){
		this._loadDataIfNeeded();

		return this.get('data').concat();
	},

	flushToStorage(){
		const storage = this.get('storage');
		storage.setItem(this._getStorageKey(), this.get('data'));
	},

	_loadDataIfNeeded(){
		if (this.get('isLoaded')){
			return;
		}

		let data = this.get('storage').getItem(this._getStorageKey()) || [];

		console.log("Loaded data", data);
		if (!data || data.length === 0){
			data = this._rebuildIndexes();
			console.log("Rebuilt data", data);
		}

		this.set('data', data);
		this.set('isLoaded', true);

		this.flushToStorage()
	},

	_rebuildIndexes(){
		const storage = this.get('storage');
		const data = [];

		checkAndAddIndex(DataStorageKeys.options);
		checkAndAddIndex(DataStorageKeys.categories);
		checkAndAddIndex(DataStorageKeys.dataVersion);
		checkAndAddIndex(DataStorageKeys.storageIndex);

		const monthsToCheck = 36 * 2;
		const date = moment().subtract(monthsToCheck / 2, "M");
		for (let i = 0; i < monthsToCheck; i++){
			checkAndAddIndex(`${DataStorageKeys.expenses}${date.year()}-${date.month()}`);
			date.add(1, "M");
		}

		return data;

		function checkAndAddIndex(key){
			console.log("Checking key", key);
			if (storage.getItem(key)){
				data.push(key);
			}
		}
	},

	_getStorageKey(){
		return DataStorageKeys.storageIndex;
	},

});
