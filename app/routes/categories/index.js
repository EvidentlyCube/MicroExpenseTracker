import Ember from 'ember';

export default Ember.Route.extend({
    categorySelectProvider: Ember.inject.service(),

    model(){
        return this.get('categorySelectProvider').getAll();
    }
});
