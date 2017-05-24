import Ember from "ember";

export default Ember.Service.extend({
	store: Ember.inject.service(),
	_cache: {},

	getCurrentMonthObject(){
		const now = new Date();
		return this.getMonthObject(now.getFullYear(), now.getMonth());
	},

	getMonthObject(year, month){
		const id = `${year}-${month}`;
		const cache = this.get('_cache');

		if (!cache.hasOwnProperty(id)) {
			cache[id] = this.constructMonthObject(year, month);
		}

		return cache[id];
	},

	getMonthObjectByDelta(monthObj, monthDelta){
		let month = monthObj.get('month') + monthDelta;
		let year = monthObj.get('year');
		while (month < 0) {
			month += 12;
			year--;
		}
		while (month > 11) {
			month -= 12;
			year++;
		}

		return this.getMonthObject(year, month);
	},

	constructMonthObject(year, month){
		return this.get('store').createRecord('month', {
			startDate: new Date(year, month, 1, 0, 0, 0, 0),
			endDate: new Date(year, month + 1, 0, 23, 59, 59, 999),
			year: year,
			month: month
		});
	}
});
