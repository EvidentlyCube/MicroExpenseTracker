import Ember from "ember";

export default Ember.Component.extend({
	tagName: '',
	index: null,
	model: null,

	vertical: false,
	horizontal: Ember.computed('vertical', function(){
		return !this.get('vertical');
	}),

	options: [],
	onChange: () => {},

	nameErrorClass: Ember.computed('model.name', 'model.errors', function () {
		return this.get('model.errors').indexOf('name') !== -1 ? "is-danger" : "";
	}),

	priceErrorClass: Ember.computed('model.price', 'model.errors', function () {
		return this.get('model.errors').indexOf('price') !== -1 ? "is-danger" : "";
	}),

	discountErrorClass: Ember.computed('model.discount', 'model.errors', function () {
		return this.get('model.errors').indexOf('discount') !== -1 ? "is-danger" : "";
	}),

	handleChange(){
		this.get('onChange')(parseInt(this.get('index')), this.get('model'));
	},

	actions: {
		changedCategory(category) {
			this.set('model.categoryId', Ember.get(category, 'id'));
		},

		handleFocus(select, e){
			if (!e.relatedTarget) {
				return;
			}

			const className = e.relatedTarget.className;
			if (className.indexOf('expense-price') !== -1 || className.indexOf('expense-discount') !== -1) {
				select.actions.open();
			}
		},

		handleCategoryInput(select, e){
			if (e.keyCode === 9) {
				select.actions.select(select.highlighted);
			}
		},

		onChangeName(event){
			this.set('model.name', event.target.value);
			this.handleChange();
		},

		onChangePrice(event){
			let value = event.target.value.replace(/,/g, '.').replace(/\s/g, '');
			let price = parseFloat(value);
			price = !isNaN(price) && isFinite(price) ? price : 0;

			this.set('model.price', price);
			this.handleChange();
		},

		onChangeDiscount(event){
			let discount = parseInt(event.target.value) / 100;
			discount = !isNaN(discount) && isFinite(discount) ? discount : 0;
			discount = Math.max(0, Math.min(100, discount));

			this.set('model.discount', discount);
			this.handleChange();
		}
	}

});
