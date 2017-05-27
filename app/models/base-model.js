import Ember from "ember";

export default Ember.Object.extend({
	modelService: Ember.inject.service('model/model-service'),
	i18n: Ember.inject.service(),

	id: null,
	errors: [],

	clone(){
		const clone = this._getSpecificService().create(this._toJson());
		clone.set('id', null);
		clone.afterLoad();

		return clone;
	},

	setFieldsFrom(source, fieldNames){
		fieldNames.forEach(name => this.set(name, source.get(name)));
	}
});
