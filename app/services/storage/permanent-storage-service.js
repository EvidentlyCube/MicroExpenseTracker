import Ember from "ember";

export default Ember.Service.extend({
	dataVersion: 2,
	nwStorage: Ember.inject.service('storage/permanent-storage-nw-file'),
	lsStorage: Ember.inject.service('storage/permanent-storage-local-storage'),

	storageIndex: Ember.inject.service('storage/permanent-storage-index'),

	storage: Ember.computed(function(){
		if (this.get('nwStorage.isEnabled')){
			return this.get('nwStorage');
		} else {
			return this.get('lsStorage');
		}
	}),

	setItem(key, value){
		this.get('storage').setItem(key, value);
		this.get('storageIndex').storeIndex(key);
	},

	getItem(key){
		return this.get('storage').getItem(key);
	},

	removeItem(key, doBackup){
		if (doBackup){
			this.get('storage').forceBackup();
		}
		this.get('storage').removeItem(key);
		this.get('storageIndex').removeIndex(key);
	}
})