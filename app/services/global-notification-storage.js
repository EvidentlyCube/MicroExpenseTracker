import Ember from "ember";

export default Ember.Service.extend({
	notifications: Ember.A([]),

	addError(message){
		this.get('notifications').pushObject({message: message});
	}
});
