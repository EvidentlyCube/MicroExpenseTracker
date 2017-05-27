import Ember from "ember";

export default Ember.Helper.extend({
	compute([value]) {
		if (!value){
			console.warn("Called date-format with null");
			return "1970-01-01";
		}

		if (typeof value === 'number'){
			console.warn("Called date-format with number");
			value = new Date(value);
		}

		let year = value.getFullYear().toString();
		let month = (value.getMonth() + 1).toString();
		let day = value.getDate().toString();

		if (month.length < 2){
			month = "0" + month;
		}
		if (day.length < 2){
			day = "0" + day;
		}

		return `${year}-${month}-${day}`;
	}
});