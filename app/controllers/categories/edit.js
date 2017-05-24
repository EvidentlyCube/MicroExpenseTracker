import Ember from "ember";

export default Ember.Controller.extend({
	i18n: Ember.inject.service(),
	store: Ember.inject.service(),
	globalNotificationStorage: Ember.inject.service(),

	formModel: Ember.computed('model', function () {
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
			const i18n = this.get('i18n');
			const globalNotificationStorage = this.get('globalNotificationStorage');
			const category = this.get('store').peekRecord('category', properties.id);

			if (category) {
				category.set('name', properties.name);
				category.set('parent', this.get('store').peekRecord('category', properties.parentId));

				category.save()
					.then(() => {
						const message = i18n.t('section.categories.notifications.updated', {
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
						category.deleteRecord();
					});
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
