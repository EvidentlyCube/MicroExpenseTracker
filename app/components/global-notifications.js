import Ember from 'ember';

export default Ember.Component.extend({
  globalNotificationStorage: Ember.inject.service(),

  notifications: Ember.computed('globalNotificationStorage.notifications.[]', function(){
    alert("getted ")
    return this.get('globalNotificationStorage.notifications')
  })
});
