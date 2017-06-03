import Category from "../models/category";
import Expense from "../models/expense";
import Month from "../models/month";

export function initialize(application) {
	application.register('model:category', Category, {instantiate: false});
	application.register('model:expense', Expense, {instantiate: false});
	application.register('model:month', Month, {instantiate: false});
}

export default {
	name: 'register-model',
	initialize
};
