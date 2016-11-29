import Ember from 'ember';
import moment from 'moment';
import _ from 'lodash/lodash';

export default Ember.Controller.extend({
    expenses: Ember.computed.alias('model.expenses'),

    expensesByDate: null,
    expensesSumByDate: null,

    resetSummaryData(){
        const expenses = this.get('expenses');
        const expensesByDate = _.groupBy(expenses.toArray(), this._lodashGroupByYearMonth);

        const expensesSumByDate = _.mapValues(expensesByDate, expenses => {
            return _.reduce(expenses, (sum, expense) => sum + expense.get('price'), 0);
        });

        console.log(expensesByDate);
        console.log(expensesSumByDate);

        this.set('expensesByDate', expensesByDate);
        this.set('expensesSumByDate', expensesSumByDate);
    },

    _lodashGroupByYearMonth(expense){
        return moment(expense).format('YYYY-MM');
    }
});
