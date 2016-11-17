import Ember from 'ember';

export default Ember.Component.extend({
  globalNotificationStorage: Ember.inject.service(),

  notifications: Ember.computed.alias('globalNotificationStorage.notifications')
});
