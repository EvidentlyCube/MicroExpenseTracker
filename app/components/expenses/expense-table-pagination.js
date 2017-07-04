import Ember from 'ember';
import constants from '../../constants/constants';
import _ from "lodash";

export default Ember.Component.extend({
	tagName: '',

	page: null,

	pagesCount: Ember.computed('expensesCount', function(){
		return Math.ceil(this.get('expensesCount') / constants.ExpensesPerPage);
	}),

	pages: Ember.computed('pagesCount', function(){
		return _.range(this.get('pagesCount'));
	})
});
