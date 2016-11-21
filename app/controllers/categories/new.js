import Ember from 'ember';

export default Ember.Controller.extend({
    store: Ember.inject.service(),
    globalNotificationStorage: Ember.inject.service(),

    actions: {
        onSave(properties){
            var self = this;
            var parent = this.get('store').peekRecord('category', properties.parentId);

            var record = this.get('store').createRecord('category', {
                name: properties.name,
                parent: parent
            });

            record.save().then(function(){
                self.get('globalNotificationStorage').addSuccess(`Category "${record.get('name')}" added`, 2000);
                self.transitionToRoute('categories.index');
            });
        },
        onCancel(){
            this.transitionToRoute('categories.index');
        }
    }
});
