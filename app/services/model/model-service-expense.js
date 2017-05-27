import Ember from "ember";
import DataStorageKeys from "../../constants/storage/key-names";

export default Ember.Service.extend({
	storage: Ember.inject.service('storage/permanent-storage-service'),

	changeTimestamp: null,
	data: {},

	create(properties){
		const Expense = this._getModelClass();
		const expense = Expense.create(properties);
		expense.set('id', null);
		return expense;
	},

	getById(id){
		const [year, month, index] = this._breakId(id);

		return this._getDataPartition(year, month)[index] || null;
	},

	getByMonth(monthObj){
		return this._getDataPartition(monthObj.year, monthObj.month).concat().filter(e => e);
	},

	modelSaved(expense){
		const [year, month] = expense.get('id') ? this._breakId(expense.get('id')) : this._breakPurchasedAt(expense.get('purchasedAt'));
		const storageKey = this._createStorageKeyName(year, month);
		const partition = this._getDataPartition(year, month);

		if (expense.get('id') === null){
			expense.set('id', `${year}-${month}-${partition.length}`);
			partition[partition.length] = expense;
		}

		this.flushToStorage(storageKey, partition);
	},

	modelDeleted(expense){
		const [year, month] = this._breakId(expense.get('id'));
		const storageKey = this._createStorageKeyName(year, month);
		const partition = this._getDataPartition(year, month);

		delete partition[expense.get('idIndex')];

		this.flushToStorage(storageKey, partition);
	},

	flushToStorage(storageKey, partition){
		const storage = this.get('storage');
		storage.setItem(storageKey, this._toJson(partition));
		this.set('changeTimestamp', Date.now());
	},

	_toJson(partition){
		const newData = [];
		partition.forEach(expense => newData.push(expense._toJson()));
		return newData;
	},

	_getDataPartition(year, month){
		this._loadDataIfNeeded(year, month);

		return this.get('data')[year][month];
	},

	_breakId(id){
		const idParts = id.split("-");
		return [
			parseInt(idParts[0]),
			parseInt(idParts[1]),
			parseInt(idParts[2])
		];
	},

	_breakPurchasedAt(purchasedAt){
		return [
			purchasedAt.getFullYear(),
			purchasedAt.getMonth()
		];
	},

	_loadDataIfNeeded(year, month){
		const storedData = this.get('data');

		if (storedData.hasOwnProperty(year) && storedData[year].hasOwnProperty(month)){
			return;
		}

		if (!storedData.hasOwnProperty(year)){
			storedData[year] = {};
		}
		if (!storedData[year].hasOwnProperty(month)){
			storedData[year][month] = [];
		}

		const Expense = this._getModelClass();
		const storageKey = this._createStorageKeyName(year, month);
		const loadedData = this.get('storage').getItem(storageKey) || [];
		const monthData = [];

		loadedData.forEach(row => {
			if (!row.id || row.id.match(/-/g).length !== 2){
				return;
			}

			const expense = Expense.create(row);
			expense.afterLoad();
			monthData[expense.get('idIndex')] = expense;
		});

		storedData[year][month] = monthData;

		this.set('data', storedData);
		this.set('autoIncrement', monthData.length);
	},

	_createStorageKeyName(year, month){
		return `${DataStorageKeys.expenses}${year}-${month}`;
	},

	_getModelClass(){
		return Ember.getOwner(this).lookup('model:expense');
	}
});
