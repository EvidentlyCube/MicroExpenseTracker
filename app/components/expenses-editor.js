import Ember from 'ember';

export default Ember.Component.extend({
    index: null,
    model: null,

    options: [],
    onChange: ()=>{},

    nameErrorClass: Ember.computed('model.name', 'model.errors', function(){
        return this.get('model.errors').indexOf('name') !== -1 ? "is-danger" : "";
    }),

    priceErrorClass: Ember.computed('model.price', 'model.errors', function(){
        return this.get('model.errors').indexOf('price') !== -1 ? "is-danger" : "";
    }),

    discountErrorClass: Ember.computed('model.discount', 'model.errors', function(){
        return this.get('model.errors').indexOf('discount') !== -1 ? "is-danger" : "";
    }),

    handleChange(){
        this.get('onChange')(parseInt(this.get('index')), this.get('model'));
    },

    actions: {
        set(property){
            this.set(property, event.target.value);
            this.handleChange();
        },

        changedCategory(category) {
            this.set('model.category', category);
        },

        handleFocus(select, e){
            if (!e.relatedTarget){
                return;
            }

            var className = e.relatedTarget.className;
            if (className.indexOf('expense-price') !== -1 || className.indexOf('expense-discount') !== -1){
                console.log(e);
                select.actions.open();
            }
        },

        handleCategoryInput(select, e){
            if (e.keyCode === 9){
                select.actions.select(select.highlighted);
            }
        }
    }

});
