import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
	i18n: Ember.inject.service(),
	storage: Ember.inject.service('storage/permanent-storage-service'),
	storageIndex: Ember.inject.service('storage/permanent-storage-index'),
	modelDaos: Ember.inject.service('dao/model-daos'),
	downloadjs: Ember.inject.service('shims/downloadjs-shim'),
	optionsService: Ember.inject.service(),
	globalNotifications: Ember.inject.service('global-notification-storage'),

	showImportModal: false,
	confirm1: false,
	confirm2: false,
	confirm3: false,

	isAllConfirmed: Ember.computed('confirm1', 'confirm2', 'confirm3', function(){
		return this.get('confirm1') && this.get('confirm2') && this.get('confirm3');
	}),

	resetCheckboxes(){
		this.set('confirm1', false);
		this.set('confirm2', false);
		this.set('confirm3', false);
	},

	clearMemory(){
		this.get('modelDaos.expense').clearMemory();
		this.get('modelDaos.category').clearMemory();
		this.get('optionsService').clearMemory();
	},

	actions: {
		deleteIndex(name){
			this.get('storage').removeItem(name, true);
			this.clearMemory();
		},

		exportData(){
			const storage = this.get('storage');
			const downloadjs = this.get('downloadjs');
			const data = {};
			const fileDatePortion = moment().format("YYYY-MM-DD-HH-mm-ss");

			this.get('model').forEach(index => data[index] = storage.getItem(index));

			downloadjs.download(JSON.stringify(data), `MET-Export-${fileDatePortion}.json`, "application/json");
		},

		importDataPressed(){
			this.set('showImportModal', true);
		},

		importData(json){
			const i18n = this.get('i18n');
			const storage = this.get('storage');
			this.set('showImportModal', false);

			this.get('storageIndex').getIndexes().forEach(function(index){
				storage.removeItem(index, false);
			});
			Object.keys(json).forEach(index => storage.setItem(index, json[index]));
			this.clearMemory();

			this.get('globalNotifications').addSuccess(i18n.t('section.options.notifications.import_success'), 3000);
		},

		importCancelled(){
			this.set('showImportModal', false);
		}
	}
})
