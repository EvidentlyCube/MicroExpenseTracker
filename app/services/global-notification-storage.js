import Ember from 'ember';

export default Ember.Service.extend({
  notifications: [],
  addError(message){
    this.get('notifications').push({message: message});
  }
});
