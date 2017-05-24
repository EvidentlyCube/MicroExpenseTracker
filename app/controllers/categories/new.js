import Ember from "ember";

export default Ember.Controller.extend({
	i18n: Ember.inject.service(),
	store: Ember.inject.service(),
	globalNotificationStorage: Ember.inject.service(),

	actions: {
		onSave(properties){
			const i18n = this.get('i18n');
			const globalNotificationStorage = this.get('globalNotificationStorage');
			const record = this.get('store').createRecord('category', {
				name: properties.name,
				parent: this.get('store').peekRecord('category', properties.parentId)
			});

			record.save()
				.then((category) => {
					const message = i18n.t('section.categories.notifications.created', {
						name: category.get('namePathForHtml')
					});
					globalNotificationStorage.addSuccess(message, 2000);
					this.transitionToRoute('categories.index');
				})
				.catch((error) => {
					const message = i18n.t('section.categories.notifications.save_failed', {
						error: Ember.get(error, 'errors.0.title')
					});
					globalNotificationStorage.addError(message, 4000);
					record.deleteRecord();
				});
		},
		onCancel(){
			this.transitionToRoute('categories.index');
		}
	}
});
