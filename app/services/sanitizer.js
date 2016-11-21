import Ember from 'ember';

export default Ember.Service.extend({
    validateRegex: /^\s*?(\d|\s)*?([.,](\d|\s)+)?$/,
    validateNumber(numberString){
        numberString = numberString.trim();
        return numberString !== "" && this.get('validateRegex').test(numberString);
    },
    parseNumber(numberString){
        numberString = numberString.trim()
            .replace(",", ".")
            .replace(/\s/g, '');
        return parseFloat(numberString);
    }
});
