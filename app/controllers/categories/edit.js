import Ember from 'ember';

export default Ember.Controller.extend({
    store: Ember.inject.service(),
    globalNotificationStorage: Ember.inject.service(),

    formModel: Ember.computed('model', function(){
        var model = this.get('model').model;
        var parent = model.get('parent');

        return {
            id: model.get('id'),
            name: model.get('name'),
            parentId: parent ? parent.get('id') : null
        };
    }),

    actions: {
        onSave(properties){
            var self = this;
            var record = this.get('store').peekRecord('category', properties.id);
            var oldName = record.get('name');

            if (record){
                record.set('name', properties.name);
                record.set('parent', this.get('store').peekRecord('category', properties.parentId));

                record.save().then(function(){
                    self.get('globalNotificationStorage').addSuccess(`Category "${oldName}" changed to "${record.get('name')}"`, 2000);
                    self.transitionToRoute('categories.index');
                });
            } else {
                self.get('globalNotificationStorage').addError(`Category no longer exists and cannot be modified added`, 4000);
                self.transitionToRoute('categories.index');
            }
        },
        onCancel(){
            this.transitionToRoute('categories.index');
        }
    }
});
