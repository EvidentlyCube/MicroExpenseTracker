import Ember from 'ember';

export default Ember.Object.extend({
    name: "",
    price: 0,
    category: "",
    discount: 0,
    errors: [],

    isEmpty(){
        return this.name === ""
            && (this.price === 0 || this.price === "")
            && this.category === ""
            && (this.discount === 0 || this.price === "");
    }
});
