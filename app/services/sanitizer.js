import Ember from 'ember';

export default Ember.Service.extend({
    validateRegex: /^\s*?(\d|\s)*?([.,](\d|\s)+)?$/,
    validateNumber(numberString){
        if (numberString === null){
            return false;
        }

        if (typeof numberString === 'number'){
            return true;
        }

        numberString = numberString.trim();
        return numberString !== "" && this.get('validateRegex').test(numberString);
    },
    parseNumber(numberString){
        if (!this.validateNumber(numberString)){
            return 0;
        }

        if (typeof numberString === 'number'){
            return numberString;
        }

        numberString = numberString.trim()
            .replace(",", ".")
            .replace(/\s/g, '');
        return parseFloat(numberString);
    }
});
