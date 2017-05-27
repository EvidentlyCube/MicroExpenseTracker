import Ember from "ember";

export default Ember.Service.extend({
	dataVersion: 2,
	nwStorage: Ember.inject.service('storage/permanent-storage-nw-file'),
	lsStorage: Ember.inject.service('storage/permanent-storage-local-storage'),

	storage: null,

	init(){
		if (this.get('nwStorage.isEnabled')){
			this.set('storage', this.get('nwStorage'));
		} else {
			this.set('storage', this.get('lsStorage'));
		}
	},

	setItem(key, value){
		this.get('storage').setItem(key, value);
	},

	getItem(key){
		return this.get('storage').getItem(key);
	}
});
