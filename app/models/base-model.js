import Ember from "ember";

export default Ember.Object.extend({
	modelDaos: Ember.inject.service('dao/model-daos'),
	i18n: Ember.inject.service(),

	id: null,
	errors: [],

	save(){
		this._getSpecificService().modelSaved(this);
	},

	delete(){
		this._getSpecificService().modelDeleted(this);
	},

	clone(){
		const clone = this._getSpecificService().create(this.toJson());
		clone.set('id', null);
		clone.afterLoad();

		return clone;
	},

	toJson(){
		return {
			id: this.get('id')
		};
	},

	setFieldsFrom(source, fieldNames = null){
		if (!fieldNames) {
			fieldNames = Object.keys(source.toJson());
			const idIndex = fieldNames.indexOf('id');
			fieldNames.splice(idIndex, 1);
		}

		fieldNames.forEach(name => this.set(name, source.get(name)));
	}
});
