import Ember from "ember";
import Month from "../models/month";

export default Ember.Service.extend({
	selectedMonth: null,

	_cache: {},

	init(){
		this.set('selectedMonth', this.getCurrentMonthObject());
	},

	getCurrentMonthObject(){
		const now = new Date();
		return this.getMonthObject(now.getFullYear(), now.getMonth());
	},

	getMonthObject(year, month){
		year = Math.max(1970, Math.min(2030, parseInt(year)));
		month = Math.max(0, Math.min(11, parseInt(month)));

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
		return Month.create({
			startDate: new Date(year, month, 1, 0, 0, 0, 0),
			endDate: new Date(year, month + 1, 0, 23, 59, 59, 999),
			year: year,
			month: month
		});
	}
});
