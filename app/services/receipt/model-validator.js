import Ember from 'ember';

export default Ember.Service.extend({
    sanitizer: Ember.inject.service(),

    validateModel(model){
        let errors = [];

        if (!model.isEmpty()) {
            const sanitizer = this.get('sanitizer');
            const name = model.get('name');
            const price = model.get('price');
            const discount = model.get('discount');

            if (name.length < 1) {
                errors.push('name');
            }

            if (price < 0.01 || !sanitizer.validateNumber(price)) {
                errors.push('price');
            }

            if (discount < 0 || discount > 100 || (discount !== "" && discount !== null && !sanitizer.validateNumber(discount))) {
                errors.push('discount');
            }
        }

        model.set('errors', Ember.A(errors));

        return errors.length > 0;
    },
    validateModels(models){
        let hasError = false;
        models.forEach((model) => {
            if (!model.isEmpty()){
                hasError = this.validateModel(model) || hasError;
            }
        });

        return hasError;
    }
});
