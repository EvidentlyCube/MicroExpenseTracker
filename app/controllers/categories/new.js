import Ember from "ember";

export default Ember.Controller.extend({
	i18n: Ember.inject.service(),
	modelDaos: Ember.inject.service('dao/model-daos'),
	globalNotificationStorage: Ember.inject.service(),

	actions: {
		onSave(properties){
			const i18n = this.get('i18n');
			const globalNotificationStorage = this.get('globalNotificationStorage');
			const category = this.get('modelDaos.category').create(properties);

			category.save();

			const message = i18n.t('section.categories.notifications.created', {
				name: category.get('namePathForHtml')
			});
			globalNotificationStorage.addSuccess(message, 2000);
			this.transitionToRoute('categories.index');
		},
		onCancel(){
			this.transitionToRoute('categories.index');
		}
	}
});
