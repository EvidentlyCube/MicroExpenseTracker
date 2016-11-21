import Ember from 'ember';

export default Ember.Controller.extend({
    store: Ember.inject.service(),

    sortCriteria: ['name'],
    sortedCategories: Ember.computed.sort('model', 'sortCriteria'),

    actions: {
        deleteCategory(id){
            this.get('store').find('expense', id)
                .then(model => model.destroyRecord({}));

            return false;
        }
    }
});
