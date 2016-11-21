import Ember from 'ember';

export default Ember.Controller.extend({
    store: Ember.inject.service(),

    sortCriteria: ['rootName', 'namePath'],
    sortedCategories: Ember.computed.sort('model', 'sortCriteria'),

    actions: {
        deleteCategory(id){
            this.get('store').find('category', id)
                .then(model => model.destroyRecord({}));

            return false;
        }
    }
});
