import Ember from 'ember';

export default Ember.Controller.extend({
	storage: Ember.inject.service('storage/permanent-storage-service'),
	modelDaos: Ember.inject.service('dao/model-daos'),
	optionsService: Ember.inject.service(),

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

	actions: {
		deleteIndex(name){
			this.get('storage').removeItem(name);
			this.get('modelDaos.expense').clearMemory();
			this.get('modelDaos.category').clearMemory();
			this.get('optionsService').clearMemory();
		}
	}
})
