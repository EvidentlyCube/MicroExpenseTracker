import Ember from "ember";

export default Ember.Route.extend({
	optionsService: Ember.inject.service(),

	beforeModel(){
		if (this.get('optionsService').getInstallationFinished()) {
			this.transitionTo('/categories');
		}
	},

	actions: {
		willTransition(transition) {
			if (!this.get('optionsService').getInstallationFinished()) {
				transition.abort();
			}
		}
	}
});
