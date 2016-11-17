import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    globalNotificationStorage: Ember.inject.service(),

    model: {
        name: "",
        parentId: ""
    },

    onSave: ()=> {
    },
    onCancel: ()=> {
    },

    getProperties() {
        return {
            name: this.$('.category-name').val(),
            parentId: this.$('.category-parent-id').val()
        };
    },
    actions: {
        saveHandler(){
            this.get('globalNotificationStorage').addError("TROLOLO");
            this.get('onSave')(this.getProperties());
        },
        cancelHandler(){
            this.get('onCancel')(this.getProperties());
        }
    }
});
