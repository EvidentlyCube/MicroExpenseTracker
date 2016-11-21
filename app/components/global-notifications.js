import Ember from "ember";

export default Ember.Component.extend({
	globalNotificationStorage: Ember.inject.service(),

	notifications: Ember.computed('globalNotificationStorage.notifications.[]', 'globalNotificationStorage.notifications.@each.hiding', function(){
		return this.get('globalNotificationStorage').get('notifications');
	}),

	actions: {
		removeNotification(id){
			this.get('globalNotificationStorage').removeNotification(id);
		}
	}
});
