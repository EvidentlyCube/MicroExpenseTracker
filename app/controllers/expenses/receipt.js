import Ember from 'ember';

const ExpenseEditorModel = Ember.Object.extend({
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

export default Ember.Controller.extend({
    globalNotificationStorage: Ember.inject.service(),
    store: Ember.inject.service(),

    models: Ember.A([
        ExpenseEditorModel.create(),
        ExpenseEditorModel.create()
    ]),

    modelsProvider: Ember.computed('models.[]', function () {
        return this.get('models');
    }),

    expenseCategories: Ember.computed('model', function () {
        var newList = this.model.map(row => row.get('namePath'));
        newList.unshift('');

        return newList;
    }),

    validateModel(model){
        var errors = [];

        if (!model.isEmpty()) {
            var name = model.get('name');
            var price = model.get('price');
            var discount = model.get('discount');

            if (name.length < 1) {
                errors.push('name');
            }

            if (price < 0.01) {
                errors.push('price');
            }

            if (discount < 0 || discount > 100) {
                errors.push('discount');
            }
        }

        model.set('errors', Ember.A(errors));
    },

    actions: {
        expenseChanged(index, model){
            var models = this.get('models');

            this.validateModel(model);

            models[index] = model;
            if (index === models.length - 1) {
                models.pushObject(new ExpenseEditorModel());
                this.set('models', models);
            }
        },

        saveHandler(){
            var self = this;
            var isError = false;
            this.get('models').forEach(function (model) {
                if (!model.isEmpty()) {
                    self.validateModel(model);
                    isError = isError || model.get('errors').length > 0;
                }
            });

            if (isError) {
                this.get('globalNotificationStorage').addError("Errors have been found in the form. Please fix the highlighted fields.", 2000);
            } else {
                var promises = [];
                this.get('models').forEach(function(model){
                    if (model.isEmpty()){
                        return;
                    }

                    var expense = this.get('store').createRecord('expense', {
                        name: model.name,
                        price: model.price,
                        discount: model.discount / 100,

                    });
                });
            }

            return false;
        },

        cancelHandler(){

        }
    }
});
