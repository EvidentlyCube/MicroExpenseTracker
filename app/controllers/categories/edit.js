import Ember from "ember";

export default Ember.Controller.extend({
	i18n: Ember.inject.service(),
	modelService: Ember.inject.service('model/model-service'),
	globalNotificationStorage: Ember.inject.service(),

	formModel: Ember.computed('model', function () {
		const model = this.get('model').model;

		return {
			id: model.get('id'),
			name: model.get('name'),
			parentId: model.get('parentId')
		};
	}),

	actions: {
		onSave(properties){
			const i18n = this.get('i18n');
			const globalNotificationStorage = this.get('globalNotificationStorage');
			const category = this.get('modelService.category').getById(properties.id);

			if (category) {
				category.set('name', properties.name);
				category.set('parentId', properties.parentId);

				category.save();
				const message = i18n.t('section.categories.notifications.updated', {
					name: category.get('namePathForHtml')
				});
				globalNotificationStorage.addSuccess(message, 2000);
				this.transitionToRoute('categories.index');

			} else {
				globalNotificationStorage.addError(i18n.t('section.categories.notifications.missing_category_update'), 4000);
				this.transitionToRoute('categories.index');
			}
		},
		onCancel(){
			this.transitionToRoute('categories.index');
		}
	}
});
