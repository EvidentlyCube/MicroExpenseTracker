import Ember from 'ember';

export default Ember.Controller.extend({
    i18n: Ember.inject.service(),
    store: Ember.inject.service(),
    globalNotificationStorage: Ember.inject.service(),

    actions: {
        onSave(properties){
            const record = this.get('store').createRecord('category', {
                name: properties.name,
                parent: this.get('store').peekRecord('category', properties.parentId)
            });

            record.save().then((category) => {
                const message = this.get('i18n').t('section.categories.notifications.created', {
                    name: category.get('namePathForHtml')
                });
                this.get('globalNotificationStorage').addSuccess(message, 2000);
                this.transitionToRoute('categories.index');
            });
        },
        onCancel(){
            this.transitionToRoute('categories.index');
        }
    }
});
