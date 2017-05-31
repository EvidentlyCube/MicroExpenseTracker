import Ember from "ember";

const {get} = Ember;

export default Ember.Service.extend({
	isEmpty(model){
		return !get(model, 'name')
			&& !get(model, 'price')
			&& !get(model, 'categoryId')
			&& !get(model, 'discount');
	}
});
