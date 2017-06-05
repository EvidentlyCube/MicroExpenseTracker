import Ember from "ember";

export default Ember.Component.extend({
	monthsService: Ember.inject.service(),

	selectedMonth: null,
	currentMonth: null,

	options: [],
	onChange: () => {},

	isCurrentMonthSelected: Ember.computed('selectedMonth', function(){
		return this.get('selectedMonth') === this.get('currentMonth');
	}),

	init(){
		this._super([...arguments]);
		this.set('currentMonth', this.get('monthsService').getCurrentMonthObject());
	},

	actions: {
		resetMonth(){
			this.set('selectedMonth', this.get('monthsService').getCurrentMonthObject());
			this.get('action')(this.get('selectedMonth'));
		},

		switchMonth(delta){
			const selectedMonth = this.get('selectedMonth');
			this.set('selectedMonth', this.get('monthsService').getMonthObjectByDelta(selectedMonth, delta));
			this.get('action')(this.get('selectedMonth'));
		}
	}
});
