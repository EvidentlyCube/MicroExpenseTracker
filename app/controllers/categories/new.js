import Ember from 'ember';

export default Ember.Controller.extend({
    store: Ember.inject.service(),

    actions: {
        onSave(properties){
            var parent = this.get('store').peekRecord('category', properties.parentId);

            var record = this.get('store').createRecord('category', {
                name: properties.name,
                parent: parent
            });
            record.save();
        },
        onCancel(properties){
            console.log("cancel");
            console.log(properties);
        }
    }
});
