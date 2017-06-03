import Ember from "ember";

export default Ember.Component.extend({
	importedJson: null,
	isInvalidFile: false,
	isVisible: false,

	categoriesCount: 0,
	expensesCount: 0,
	expenseMonthsCount: 0,

	onImport: null,
	onCancel: null,

	isSaveDisabled: Ember.computed('importedJson', function () {
		return !this.get('importedJson') || this.get('isInvalidFile');
	}),

	handleFileRead(event){
		const contents = event.target.result;

		this.set('isInvalidFile', false);

		try {
			const json = JSON.parse(decodeURIComponent(contents));
			this.parseJson(json);

		} catch (exception) {
			this.set('isInvalidFile', true);
		}
	},

	parseJson(json){
		this.set('importedJson', json);

		let categoriesCount = 0;
		let expensesCount = 0;
		let expenseMonthsCount = 0;

		Object.keys(json).forEach(key => {
			if (key === "categories-data") {
				categoriesCount += json[key].length;

			} else if (key.indexOf('expenses-data') === 0) {
				expensesCount += json[key].length;
				expenseMonthsCount++;
			}
		});

		if (categoriesCount + expensesCount + expenseMonthsCount === 0) {
			this.set('isInvalidFile', true);
			this.set('importedJson', null);
			return;
		}

		this.set('categoriesCount', categoriesCount);
		this.set('expensesCount', expensesCount);
		this.set('expenseMonthsCount', expenseMonthsCount);
	},

	actions: {
		fileSelected(event){
			if (event.target.files.length === 0) {
				return;
			}

			this.set('importedJson', null);

			const reader = new FileReader();
			reader.onload = Ember.run.bind(this, this.handleFileRead);
			reader.readAsText(event.target.files[0]);
		},

		save(){
			if (this.get('isSaveDisabled')) {
				return;
			}
			const json = this.get('importedJson');
			this.set('importedJson', null);

			this.get('onImport')(json);
		},

		cancel(){
			this.set('json', null);
			this.get('onCancel')();
		}
	}
});
