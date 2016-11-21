import Ember from 'ember';

export default Ember.Service.extend({
    store: Ember.inject.service(),

    getAll(){
        return this.get('store').findAll('category');
    },

    getAllSortedByPath(){
        return this.get('store').findAll('category').then(rows => rows.sortBy('rootName', 'namePath'));
    }
});
