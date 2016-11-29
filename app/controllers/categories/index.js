import Ember from 'ember';

export default Ember.Controller.extend({
    i18n: Ember.inject.service(),
    globalNotificationStorage: Ember.inject.service(),
    store: Ember.inject.service(),

    sortCriteria: ['rootName', 'namePath'],
    sortedCategories: Ember.computed.sort('model', 'sortCriteria'),

    actions: {
        deleteCategory(id){
            this.get('store').find('category', id).then((model) => {
                return model.destroyRecord({});
            }).then((model) => {
                const i18n = this.get('i18n');
                const globalNotificationStorage = this.get('globalNotificationStorage');
                const message = i18n.t('section.categories.notifications.deleted', {
                    name: model.get('namePathForHtml')
                });

                globalNotificationStorage.addWarning(message, 4000);
            });

            return false;
        }
    }
});
