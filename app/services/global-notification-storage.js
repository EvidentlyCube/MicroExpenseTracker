import Ember from 'ember';

export default Ember.Service.extend({
  notifications: [],

  addError(message){
    alert("added");
    this.get('notifications').push({message: message});
  }
});
