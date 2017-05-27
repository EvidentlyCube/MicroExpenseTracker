import Ember from "ember";

export default Ember.Helper.extend({
	compute([value], hash) {
		if (hash.isFraction){
			return `${(value * 100).toFixed(2)}%`;
		} else {
			return `${value.toFixed(2)}%`;

		}
	}
});