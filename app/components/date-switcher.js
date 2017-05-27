import Ember from "ember";

export default Ember.Component.extend({
	monthsService: Ember.inject.service(),

	currentMonth: null,

	options: [],
	onChange: () => {},

	actions: {
		resetMonth(){
			this.set('currentMonth', this.get('monthsService').getCurrentMonthObject());
			this.get('action')(this.get('currentMonth'));
		},

		switchMonth(delta){
			const currentMonth = this.get('currentMonth');
			this.set('currentMonth', this.get('monthsService').getMonthObjectByDelta(currentMonth, delta));
			this.get('action')(this.get('currentMonth'));
		}
	}
});
