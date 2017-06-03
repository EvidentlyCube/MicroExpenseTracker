import Ember from "ember";

export default Ember.Component.extend({
	decisionTime: 1000,
	isTriggered: false,

	actions: {
		trigger(){
			if (this.get('isTriggered')) {
				this.set('isTriggered', false);
				Ember.run.cancel(this.get('resetTimerId'));
				this.get('onConfirm')();

			} else {
				this.set('isTriggered', true);
				const id = Ember.run.later(this, function () {
					this.set('isTriggered', false);

				}, this.get('decisionTime'));

				this.set('resetTimerId', id);
			}
		}
	}
})
