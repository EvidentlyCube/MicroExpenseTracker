"use strict";



define('micro-expense-tracker/adapters/ls-adapter', ['exports', 'ember-localstorage-adapter/adapters/ls-adapter'], function (exports, _lsAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _lsAdapter.default;
});
define("micro-expense-tracker/app", ["exports", "ember", "micro-expense-tracker/resolver", "ember-load-initializers", "micro-expense-tracker/config/environment"], function (exports, _ember, _resolver, _emberLoadInitializers, _environment) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});


	var App = void 0;

	_ember.default.MODEL_FACTORY_INJECTIONS = true;

	App = _ember.default.Application.extend({
		modulePrefix: _environment.default.modulePrefix,
		podModulePrefix: _environment.default.podModulePrefix,
		Resolver: _resolver.default
	});

	(0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

	exports.default = App;
});
define('micro-expense-tracker/components/basic-dropdown', ['exports', 'ember-basic-dropdown/components/basic-dropdown'], function (exports, _basicDropdown) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _basicDropdown.default;
    }
  });
});
define('micro-expense-tracker/components/basic-dropdown/content-element', ['exports', 'ember-basic-dropdown/components/basic-dropdown/content-element'], function (exports, _contentElement) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _contentElement.default;
    }
  });
});
define('micro-expense-tracker/components/basic-dropdown/content', ['exports', 'ember-basic-dropdown/components/basic-dropdown/content'], function (exports, _content) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _content.default;
    }
  });
});
define('micro-expense-tracker/components/basic-dropdown/trigger', ['exports', 'ember-basic-dropdown/components/basic-dropdown/trigger'], function (exports, _trigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _trigger.default;
    }
  });
});
define('micro-expense-tracker/components/categories/category-index-row', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Component.extend({
		tagName: '',

		row: null,
		onDeleteCategory: null,

		actions: {
			deleteCategory: function deleteCategory(id) {
				this.get('onDeleteCategory')(id);
			}
		}
	});
});
define("micro-expense-tracker/components/category-editor", ["exports", "ember"], function (exports, _ember) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Component.extend({
		categories: [],
		model: {
			id: "",
			name: "",
			parentId: ""
		},

		categoriesData: _ember.default.computed('categories', function () {
			var _this = this;

			return this.get('categories').filter(function (row) {
				return row.get('id') !== _this.get('model').id;
			}).map(function (category) {
				return {
					name: category.get('namePath'),
					value: category.get('id')
				};
			});
		}),

		onSave: function onSave() {},
		onCancel: function onCancel() {},

		getProperties: function getProperties() {
			return {
				id: parseInt(this.$('.category-id').val()),
				name: this.$('.name-input').val(),
				parentId: parseInt(this.$('.parent-id-input').val()) || null
			};
		},


		actions: {
			saveHandler: function saveHandler() {
				this.get('onSave')(this.getProperties());

				return false;
			},
			cancelHandler: function cancelHandler() {
				this.get('onCancel')(this.getProperties());

				return false;
			}
		}
	});
});
define('micro-expense-tracker/components/common/button-bar', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Component.extend({
		options: null,
		value: null,
		onClick: null,

		actions: {
			handleClicked: function handleClicked(value) {
				this.set('value', value);
				this.sendAction('action', value);
			}
		}
	});
});
define('micro-expense-tracker/components/common/danger-button', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Component.extend({
		decisionTime: 1000,
		isTriggered: false,

		actions: {
			trigger: function trigger() {
				if (this.get('isTriggered')) {
					this.set('isTriggered', false);
					_ember.default.run.cancel(this.get('resetTimerId'));
					this.get('onConfirm')();
				} else {
					this.set('isTriggered', true);
					var id = _ember.default.run.later(this, function () {
						this.set('isTriggered', false);
					}, this.get('decisionTime'));

					this.set('resetTimerId', id);
				}
			}
		}
	});
});
define('micro-expense-tracker/components/date-switcher', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Component.extend({
		monthsService: _ember.default.inject.service(),

		currentMonth: null,

		options: [],
		onChange: function onChange() {},

		actions: {
			resetMonth: function resetMonth() {
				this.set('currentMonth', this.get('monthsService').getCurrentMonthObject());
				this.get('action')(this.get('currentMonth'));
			},
			switchMonth: function switchMonth(delta) {
				var currentMonth = this.get('currentMonth');
				this.set('currentMonth', this.get('monthsService').getMonthObjectByDelta(currentMonth, delta));
				this.get('action')(this.get('currentMonth'));
			}
		}
	});
});
define('micro-expense-tracker/components/ember-wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, _emberWormhole) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberWormhole.default;
    }
  });
});
define('micro-expense-tracker/components/expenses-editor', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Component.extend({
		tagName: '',
		index: null,
		model: null,

		vertical: false,
		horizontal: _ember.default.computed('vertical', function () {
			return !this.get('vertical');
		}),

		options: [],
		onChange: function onChange() {},

		nameErrorClass: _ember.default.computed('model.name', 'model.errors', function () {
			return this.get('model.errors').indexOf('name') !== -1 ? "is-danger" : "";
		}),

		priceErrorClass: _ember.default.computed('model.price', 'model.errors', function () {
			return this.get('model.errors').indexOf('price') !== -1 ? "is-danger" : "";
		}),

		discountErrorClass: _ember.default.computed('model.discount', 'model.errors', function () {
			return this.get('model.errors').indexOf('discount') !== -1 ? "is-danger" : "";
		}),

		handleChange: function handleChange() {
			this.get('onChange')(parseInt(this.get('index')), this.get('model'));
		},


		actions: {
			changedCategory: function changedCategory(category) {
				this.set('model.categoryId', _ember.default.get(category, 'id'));
			},
			handleFocus: function handleFocus(select, e) {
				if (!e.relatedTarget) {
					return;
				}

				var className = e.relatedTarget.className;
				if (className.indexOf('expense-price') !== -1 || className.indexOf('expense-discount') !== -1) {
					select.actions.open();
				}
			},
			handleCategoryInput: function handleCategoryInput(select, e) {
				if (e.keyCode === 9) {
					select.actions.select(select.highlighted);
				}
			},
			onChangeName: function onChangeName(event) {
				this.set('model.name', event.target.value);
				this.handleChange();
			},
			onChangePrice: function onChangePrice(event) {
				var value = event.target.value.replace(/,/g, '.').replace(/\s/g, '');
				var price = parseFloat(value);
				price = !isNaN(price) && isFinite(price) ? price : 0;

				this.set('model.price', price);
				this.handleChange();
			},
			onChangeDiscount: function onChangeDiscount(event) {
				var discount = parseInt(event.target.value) / 100;
				discount = !isNaN(discount) && isFinite(discount) ? discount : 0;
				discount = Math.max(0, Math.min(100, discount));

				this.set('model.discount', discount);
				this.handleChange();
			}
		}

	});
});
define('micro-expense-tracker/components/global-notifications', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Component.extend({
		globalNotificationStorage: _ember.default.inject.service(),

		notifications: _ember.default.computed('globalNotificationStorage.notifications.[]', 'globalNotificationStorage.notifications.@each.hiding', function () {
			return this.get('globalNotificationStorage').get('notifications');
		}),

		actions: {
			removeNotification: function removeNotification(id) {
				this.get('globalNotificationStorage').removeNotification(id);
			}
		}
	});
});
define('micro-expense-tracker/components/options/import-data', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Component.extend({
		importedJson: null,
		isInvalidFile: false,
		isVisible: false,

		categoriesCount: 0,
		expensesCount: 0,
		expenseMonthsCount: 0,

		onImport: null,
		onCancel: null,

		isSaveDisabled: _ember.default.computed('importedJson', function () {
			return !this.get('importedJson') || this.get('isInvalidFile');
		}),

		handleFileRead: function handleFileRead(event) {
			var contents = event.target.result;

			this.set('isInvalidFile', false);

			try {
				var json = JSON.parse(decodeURIComponent(contents));
				this.parseJson(json);
			} catch (exception) {
				this.set('isInvalidFile', true);
			}
		},
		parseJson: function parseJson(json) {
			this.set('importedJson', json);

			var categoriesCount = 0;
			var expensesCount = 0;
			var expenseMonthsCount = 0;

			Object.keys(json).forEach(function (key) {
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
			fileSelected: function fileSelected(event) {
				if (event.target.files.length === 0) {
					return;
				}

				this.set('importedJson', null);

				var reader = new FileReader();
				reader.onload = _ember.default.run.bind(this, this.handleFileRead);
				reader.readAsText(event.target.files[0]);
			},
			save: function save() {
				if (this.get('isSaveDisabled')) {
					return;
				}
				var json = this.get('importedJson');
				this.set('importedJson', null);

				this.get('onImport')(json);
			},
			cancel: function cancel() {
				this.set('json', null);
				this.get('onCancel')();
			}
		}
	});
});
define('micro-expense-tracker/components/pikaday-input', ['exports', 'ember', 'ember-pikaday/components/pikaday-input'], function (exports, _ember, _pikadayInput) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pikadayInput.default;
});
define('micro-expense-tracker/components/pikaday-inputless', ['exports', 'ember-pikaday/components/pikaday-inputless'], function (exports, _pikadayInputless) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _pikadayInputless.default;
    }
  });
});
define('micro-expense-tracker/components/power-select-multiple', ['exports', 'ember-power-select/components/power-select-multiple'], function (exports, _powerSelectMultiple) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _powerSelectMultiple.default;
    }
  });
});
define('micro-expense-tracker/components/power-select-multiple/trigger', ['exports', 'ember-power-select/components/power-select-multiple/trigger'], function (exports, _trigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _trigger.default;
    }
  });
});
define('micro-expense-tracker/components/power-select', ['exports', 'ember-power-select/components/power-select'], function (exports, _powerSelect) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _powerSelect.default;
    }
  });
});
define('micro-expense-tracker/components/power-select/before-options', ['exports', 'ember-power-select/components/power-select/before-options'], function (exports, _beforeOptions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _beforeOptions.default;
    }
  });
});
define('micro-expense-tracker/components/power-select/options', ['exports', 'ember-power-select/components/power-select/options'], function (exports, _options) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _options.default;
    }
  });
});
define('micro-expense-tracker/components/power-select/placeholder', ['exports', 'ember-power-select/components/power-select/placeholder'], function (exports, _placeholder) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _placeholder.default;
    }
  });
});
define('micro-expense-tracker/components/power-select/power-select-group', ['exports', 'ember-power-select/components/power-select/power-select-group'], function (exports, _powerSelectGroup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _powerSelectGroup.default;
    }
  });
});
define('micro-expense-tracker/components/power-select/search-message', ['exports', 'ember-power-select/components/power-select/search-message'], function (exports, _searchMessage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _searchMessage.default;
    }
  });
});
define('micro-expense-tracker/components/power-select/trigger', ['exports', 'ember-power-select/components/power-select/trigger'], function (exports, _trigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _trigger.default;
    }
  });
});
define("micro-expense-tracker/components/select-input", ["exports", "ember"], function (exports, _ember) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Component.extend({
		id: "",
		class: "",
		name: "",
		tagName: "select",

		options: [],
		selectedValue: "",
		firstOption: ""
	});
});
define("micro-expense-tracker/constants/options/language-options", ["exports", "ember"], function (exports, _ember) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.A([{
		value: "pl",
		display: "Polski"
	}, {
		value: "en",
		display: "English"
	}]);
});
define('micro-expense-tracker/constants/options/option-names', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		CurrentLanguage: 'current-language',
		CurrencyDisplay: 'currency-display',
		InstallationFinished: 'is-installed'
	};
});
define('micro-expense-tracker/constants/storage/key-names', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		categories: 'categories-data',
		expenses: 'expenses-data-',
		dataVersion: 'data-version',
		options: 'options',
		storageIndex: 'storage-index'
	};
});
define('micro-expense-tracker/controllers/application', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Controller.extend({
		i18n: _ember.default.inject.service(),
		optionsService: _ember.default.inject.service(),
		monthsService: _ember.default.inject.service(),

		currentMonth: _ember.default.computed.alias('monthsService.currentMonth'),

		init: function init() {
			this.set('i18n.locale', this.get('optionsService').getCurrentLanguage());
			document.title = this.get('i18n').t('app.page_title');
		},


		actions: {
			currentMonthChanged: function currentMonthChanged(newMonth) {
				this.set('currentMonth', newMonth);
			}
		}
	});
});
define('micro-expense-tracker/controllers/categories/edit', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Controller.extend({
		i18n: _ember.default.inject.service(),
		modelDaos: _ember.default.inject.service('dao/model-daos'),
		globalNotificationStorage: _ember.default.inject.service(),

		formModel: _ember.default.computed('model', function () {
			var model = this.get('model').model;

			return {
				id: model.get('id'),
				name: model.get('name'),
				parentId: model.get('parentId')
			};
		}),

		actions: {
			onSave: function onSave(properties) {
				var i18n = this.get('i18n');
				var globalNotificationStorage = this.get('globalNotificationStorage');
				var category = this.get('modelDaos.category').getById(properties.id);

				if (category) {
					category.set('name', properties.name);
					category.set('parentId', properties.parentId);

					category.save();
					var message = i18n.t('section.categories.notifications.updated', {
						name: category.get('namePathForHtml')
					});
					globalNotificationStorage.addSuccess(message, 2000);
					this.transitionToRoute('categories.index');
				} else {
					globalNotificationStorage.addError(i18n.t('section.categories.notifications.missing_category_update'), 4000);
					this.transitionToRoute('categories.index');
				}
			},
			onCancel: function onCancel() {
				this.transitionToRoute('categories.index');
			}
		}
	});
});
define('micro-expense-tracker/controllers/categories/index', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Controller.extend({
		i18n: _ember.default.inject.service(),
		modelDaos: _ember.default.inject.service('dao/model-daos'),
		globalNotificationStorage: _ember.default.inject.service(),

		sortCriteria: ['rootName', 'namePath'],
		sortedCategories: _ember.default.computed.sort('model', 'sortCriteria'),

		actions: {
			deleteCategory: function deleteCategory(id) {
				var category = this.get('modelDaos.category').getById(id);
				category.delete();

				var i18n = this.get('i18n');
				var globalNotificationStorage = this.get('globalNotificationStorage');
				var message = i18n.t('section.categories.notifications.deleted', {
					name: category.get('namePathForHtml')
				});

				globalNotificationStorage.addWarning(message, 4000);

				return false;
			}
		}
	});
});
define('micro-expense-tracker/controllers/categories/new', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Controller.extend({
		i18n: _ember.default.inject.service(),
		modelDaos: _ember.default.inject.service('dao/model-daos'),
		globalNotificationStorage: _ember.default.inject.service(),

		actions: {
			onSave: function onSave(properties) {
				var i18n = this.get('i18n');
				var globalNotificationStorage = this.get('globalNotificationStorage');
				var category = this.get('modelDaos.category').create(properties);

				category.save();

				var message = i18n.t('section.categories.notifications.created', {
					name: category.get('namePathForHtml')
				});
				globalNotificationStorage.addSuccess(message, 2000);
				this.transitionToRoute('categories.index');
			},
			onCancel: function onCancel() {
				this.transitionToRoute('categories.index');
			}
		}
	});
});
define('micro-expense-tracker/controllers/expenses/edit', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Controller.extend({
		i18n: _ember.default.inject.service(),
		modelDaos: _ember.default.inject.service('dao/model-daos'),
		modelSaver: _ember.default.inject.service('expense/model-saver'),
		modelValidator: _ember.default.inject.service('expense/model-validator'),
		globalNotificationStorage: _ember.default.inject.service(),

		expense: _ember.default.computed.alias('model.expenseClone'),
		expenseOriginal: _ember.default.computed.alias('model.expenseOriginal'),
		categories: _ember.default.computed.alias('model.categories'),

		actions: {
			dateChanged: function dateChanged(newDate) {
				this.set('expense.purchasedAt', newDate);
			},
			expenseChanged: function expenseChanged(index, model) {
				this.get('modelValidator').validateModel(model);
			},
			saveHandler: function saveHandler() {
				var i18n = this.get('i18n');
				var validator = this.get('modelValidator');
				var globalNotificationStorage = this.get('globalNotificationStorage');
				var clone = this.get('expense');
				var expense = this.get('model.expenseOriginal');

				if (validator.validateModel(clone)) {
					globalNotificationStorage.addError(i18n.t('section.expenses.notifications.fix_form'), 2000);
				} else {
					expense.setFieldsFrom(clone, ['name', 'price', 'discount', 'purchasedAt', 'categoryId']);
					expense.set('updatedAt', new Date());
					expense.save();

					globalNotificationStorage.addSuccess(i18n.t('section.expenses.notifications.modified_expense'), 2000);
					this.transitionToRoute('expenses.index');
				}

				return false;
			},
			cancelHandler: function cancelHandler() {
				this.transitionToRoute('expenses.index');

				return false;
			}
		}
	});
});
define('micro-expense-tracker/controllers/expenses/index', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Controller.extend({
		queryParams: [{ filterCategoryId: 'filter-category-id' }],

		i18n: _ember.default.inject.service(),
		globalNotificationStorage: _ember.default.inject.service(),
		modelDaos: _ember.default.inject.service('dao/model-daos'),
		store: _ember.default.inject.service(),
		monthsService: _ember.default.inject.service(),

		filterCategoryId: null,
		filterCategory: _ember.default.computed('filterCategoryId', function () {
			return this.get('modelDaos.category').getById(this.get('filterCategoryId'));
		}),

		expenses: _ember.default.computed.alias('model'),

		sortCriteria: ['purchasedAt:desc', 'createdAt:desc'],
		isFiltered: _ember.default.computed('filterCategoryId', function () {
			return this.get('filterCategory');
		}),
		filteredExpenses: _ember.default.computed.filter('model.expenses', function (expense) {
			var filterCategory = this.get('filterCategory');

			if (filterCategory && filterCategory !== expense.get('category') && !filterCategory.isParentOf(expense.get('category'))) {
				return false;
			}

			return true;
		}).property('model.expenses', 'modelDaos.expense.changeTimestamp', 'filterCategoryId'),

		sortedExpenses: _ember.default.computed.sort('filteredExpenses', 'sortCriteria'),

		actions: {
			deleteExpense: function deleteExpense(id) {
				var model = this.get('modelDaos.expense').getById(id);
				model.delete();

				var i18n = this.get('i18n');
				var globalNotificationStorage = this.get('globalNotificationStorage');
				var message = i18n.t('section.expenses.notifications.deleted', {
					name: model.get('name')
				});

				globalNotificationStorage.addWarning(message, 4000);
				return false;
			},
			removeFilter: function removeFilter(name) {
				this.set(name, null);
			}
		}
	});
});
define('micro-expense-tracker/controllers/expenses/receipt', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Controller.extend({
		i18n: _ember.default.inject.service(),
		modelDaos: _ember.default.inject.service('dao/model-daos'),
		modelSaver: _ember.default.inject.service('expense/model-saver'),
		modelValidator: _ember.default.inject.service('expense/model-validator'),
		globalNotificationStorage: _ember.default.inject.service(),

		expenses: _ember.default.computed.alias('model.expenses'),
		receiptDate: _ember.default.computed.alias('model.receiptDate'),
		categories: _ember.default.computed.alias('model.categories'),

		actions: {
			dateChanged: function dateChanged(newDate) {
				this.set('receiptDate', newDate);
			},
			expenseChanged: function expenseChanged(index, model) {
				var expenses = this.get('expenses');

				this.get('modelValidator').validateModel(model);

				expenses[index] = model;
				if (index === expenses.length - 1) {
					expenses.pushObject(this.get('modelDaos.expense').create());
					this.notifyPropertyChange('expenses');
				}
			},
			saveHandler: function saveHandler() {
				var _this = this;

				var i18n = this.get('i18n');
				var validator = this.get('modelValidator');
				var modelSaver = this.get('modelSaver');
				var globalNotificationStorage = this.get('globalNotificationStorage');
				var expenses = this.get('expenses');

				if (validator.validateModels(expenses)) {
					globalNotificationStorage.addError(i18n.t('section.expenses.notifications.fix_form'), 2000);
				} else {
					modelSaver.saveModels(expenses, this.get('receiptDate')).then(function () {
						globalNotificationStorage.addSuccess(i18n.t('section.expenses.notifications.created_receipt'), 2000);
						_this.transitionToRoute('expenses.index');
					});
				}

				return false;
			},
			cancelHandler: function cancelHandler() {
				this.transitionToRoute('expenses.index');

				return false;
			}
		}
	});
});
define("micro-expense-tracker/controllers/install", ["exports", "ember", "micro-expense-tracker/constants/options/language-options"], function (exports, _ember, _languageOptions) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});


	var Currencies = _ember.default.A([{
		value: "$~~PRICE~~",
		display: "$54.20"
	}, {
		value: "~~PRICE~~ zł",
		display: "54.20 zł"
	}]);

	exports.default = _ember.default.Controller.extend({
		i18n: _ember.default.inject.service(),
		optionsService: _ember.default.inject.service(),
		optionsLanguage: null,
		optionsCurrencies: null,

		selectedCurrency: null,

		init: function init() {
			this.set("optionsLanguage", _languageOptions.default);
			this.set("optionsCurrencies", Currencies);
			this.set("selectedCurrency", this.get('optionsService').getCurrencyDisplay());
		},


		actions: {
			handleLanguageChanged: function handleLanguageChanged(language) {
				this.set('i18n.locale', language);
				this.get('optionsService').setCurrentLanguage(language);
				document.title = this.get('i18n').t('app.page_title');
			},
			handleCurrencyChanged: function handleCurrencyChanged(currency) {
				this.get('optionsService').setCurrencyDisplay(currency);
			},
			start: function start() {
				this.get("optionsService").setInstallationFinished(true);
				this.transitionToRoute('/categories');
			}
		}
	});
});
define('micro-expense-tracker/controllers/options/language', ['exports', 'ember', 'micro-expense-tracker/constants/options/language-options'], function (exports, _ember, _languageOptions) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Controller.extend({
		i18n: _ember.default.inject.service(),
		optionsService: _ember.default.inject.service(),

		optionsLanguage: null,

		currencyPrefix: "",
		currencySuffix: "",

		refreshData: function refreshData() {
			var currencyDisplay = this.get('optionsService').getCurrencyDisplay();
			var currencySegments = currencyDisplay.split('~~PRICE~~');
			var prefix = currencySegments.shift();
			var suffix = currencySegments.join("~~PRICE~~");

			this.set("optionsLanguage", _languageOptions.default);
			this.set("currencyPrefix", prefix);
			this.set("currencySuffix", suffix);
		},
		saveCurrencyDisplay: function saveCurrencyDisplay() {
			var prefix = this.get('currencyPrefix');
			var suffix = this.get('currencySuffix');

			this.get('optionsService').setCurrencyDisplay(prefix + '~~PRICE~~' + suffix);
		},


		actions: {
			handleLanguageChanged: function handleLanguageChanged(language) {
				this.set('i18n.locale', language);
				this.get('optionsService').setCurrentLanguage(language);
				document.title = this.get('i18n').t('app.page_title');
			},
			handlePrefixChanged: function handlePrefixChanged(event) {
				this.set('currencyPrefix', event.target.value);
				this.saveCurrencyDisplay();
			},
			handleSuffixChanged: function handleSuffixChanged(event) {
				this.set('currencySuffix', event.target.value);
				this.saveCurrencyDisplay();
			}
		}
	});
});
define('micro-expense-tracker/controllers/options/storage', ['exports', 'ember', 'moment'], function (exports, _ember, _moment) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Controller.extend({
		i18n: _ember.default.inject.service(),
		storage: _ember.default.inject.service('storage/permanent-storage-service'),
		storageIndex: _ember.default.inject.service('storage/permanent-storage-index'),
		modelDaos: _ember.default.inject.service('dao/model-daos'),
		downloadjs: _ember.default.inject.service('shims/downloadjs-shim'),
		optionsService: _ember.default.inject.service(),
		globalNotifications: _ember.default.inject.service('global-notification-storage'),

		showImportModal: false,
		confirm1: false,
		confirm2: false,
		confirm3: false,

		isAllConfirmed: _ember.default.computed('confirm1', 'confirm2', 'confirm3', function () {
			return this.get('confirm1') && this.get('confirm2') && this.get('confirm3');
		}),

		resetCheckboxes: function resetCheckboxes() {
			this.set('confirm1', false);
			this.set('confirm2', false);
			this.set('confirm3', false);
		},
		clearMemory: function clearMemory() {
			this.get('modelDaos.expense').clearMemory();
			this.get('modelDaos.category').clearMemory();
			this.get('optionsService').clearMemory();
		},


		actions: {
			deleteIndex: function deleteIndex(name) {
				this.get('storage').removeItem(name, true);
				this.clearMemory();
			},
			exportData: function exportData() {
				var storage = this.get('storage');
				var downloadjs = this.get('downloadjs');
				var data = {};
				var fileDatePortion = (0, _moment.default)().format("YYYY-MM-DD-HH-mm-ss");

				this.get('model').forEach(function (index) {
					return data[index] = storage.getItem(index);
				});

				downloadjs.download(encodeURIComponent(JSON.stringify(data)), 'MET-Export-' + fileDatePortion + '.json', "text/plain");
			},
			importDataPressed: function importDataPressed() {
				this.set('showImportModal', true);
			},
			importData: function importData(json) {
				var i18n = this.get('i18n');
				var storage = this.get('storage');
				this.set('showImportModal', false);

				this.get('storageIndex').getIndexes().forEach(function (index) {
					storage.removeItem(index, false);
				});
				Object.keys(json).forEach(function (index) {
					return storage.setItem(index, json[index]);
				});
				this.clearMemory();

				this.get('globalNotifications').addSuccess(i18n.t('section.options.notifications.import_success'), 3000);
			},
			importCancelled: function importCancelled() {
				this.set('showImportModal', false);
			}
		}
	});
});
define('micro-expense-tracker/controllers/summary', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _slicedToArray = function () {
		function sliceIterator(arr, i) {
			var _arr = [];
			var _n = true;
			var _d = false;
			var _e = undefined;

			try {
				for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
					_arr.push(_s.value);

					if (i && _arr.length === i) break;
				}
			} catch (err) {
				_d = true;
				_e = err;
			} finally {
				try {
					if (!_n && _i["return"]) _i["return"]();
				} finally {
					if (_d) throw _e;
				}
			}

			return _arr;
		}

		return function (arr, i) {
			if (Array.isArray(arr)) {
				return arr;
			} else if (Symbol.iterator in Object(arr)) {
				return sliceIterator(arr, i);
			} else {
				throw new TypeError("Invalid attempt to destructure non-iterable instance");
			}
		};
	}();

	exports.default = _ember.default.Controller.extend({
		modelDaos: _ember.default.inject.service('dao/model-daos'),
		monthsService: _ember.default.inject.service(),
		summaryService: _ember.default.inject.service(),

		totalSum: 0,
		uncategorizedSum: 0,
		expensesPerCategory: null,

		modelChanged: _ember.default.observer('model', function () {
			this.resetSummaryData();
		}),

		resetSummaryData: function resetSummaryData() {
			var _get$calculateExpense = this.get('summaryService').calculateExpenseData(this.get('model.expenses'), this.get('model.categories')),
			    _get$calculateExpense2 = _slicedToArray(_get$calculateExpense, 3),
			    totalSum = _get$calculateExpense2[0],
			    uncategorizedSum = _get$calculateExpense2[1],
			    expensesPerCategory = _get$calculateExpense2[2];

			expensesPerCategory = expensesPerCategory.sortBy('category.namePath');

			this.set('totalSum', totalSum);
			this.set('uncategorizedSum', uncategorizedSum);
			this.set('expensesPerCategory', expensesPerCategory);
		}
	});
});
define('micro-expense-tracker/helpers/and', ['exports', 'ember', 'ember-truth-helpers/helpers/and'], function (exports, _ember, _and) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (_ember.default.Helper) {
    forExport = _ember.default.Helper.helper(_and.andHelper);
  } else if (_ember.default.HTMLBars.makeBoundHelper) {
    forExport = _ember.default.HTMLBars.makeBoundHelper(_and.andHelper);
  }

  exports.default = forExport;
});
define('micro-expense-tracker/helpers/app-version', ['exports', 'ember', 'micro-expense-tracker/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _ember, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  var version = _environment.default.APP.version;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (hash.hideSha) {
      return version.match(_regexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_regexp.shaRegExp)[0];
    }

    return version;
  }

  exports.default = _ember.default.Helper.helper(appVersion);
});
define('micro-expense-tracker/helpers/cancel-all', ['exports', 'ember', 'ember-concurrency/-helpers'], function (exports, _ember, _helpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.cancelHelper = cancelHelper;


  var CANCEL_REASON = "the 'cancel-all' template helper was invoked";

  function cancelHelper(args) {
    var cancelable = args[0];
    if (!cancelable || typeof cancelable.cancelAll !== 'function') {
      _ember.default.assert('The first argument passed to the `cancel-all` helper should be a Task or TaskGroup (without quotes); you passed ' + cancelable, false);
    }

    return (0, _helpers.taskHelperClosure)('cancelAll', [cancelable, CANCEL_REASON]);
  }

  exports.default = _ember.default.Helper.helper(cancelHelper);
});
define('micro-expense-tracker/helpers/currency-format', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _slicedToArray = function () {
		function sliceIterator(arr, i) {
			var _arr = [];
			var _n = true;
			var _d = false;
			var _e = undefined;

			try {
				for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
					_arr.push(_s.value);

					if (i && _arr.length === i) break;
				}
			} catch (err) {
				_d = true;
				_e = err;
			} finally {
				try {
					if (!_n && _i["return"]) _i["return"]();
				} finally {
					if (_d) throw _e;
				}
			}

			return _arr;
		}

		return function (arr, i) {
			if (Array.isArray(arr)) {
				return arr;
			} else if (Symbol.iterator in Object(arr)) {
				return sliceIterator(arr, i);
			} else {
				throw new TypeError("Invalid attempt to destructure non-iterable instance");
			}
		};
	}();

	exports.default = _ember.default.Helper.extend({
		optionsService: _ember.default.inject.service(''),

		compute: function compute(_ref) {
			var _ref2 = _slicedToArray(_ref, 1),
			    value = _ref2[0];

			var display = this.get('optionsService').getCurrencyDisplay();
			return display.replace(/~~PRICE~~/g, value.toFixed(2));
		}
	});
});
define("micro-expense-tracker/helpers/date-format", ["exports", "ember"], function (exports, _ember) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _slicedToArray = function () {
		function sliceIterator(arr, i) {
			var _arr = [];
			var _n = true;
			var _d = false;
			var _e = undefined;

			try {
				for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
					_arr.push(_s.value);

					if (i && _arr.length === i) break;
				}
			} catch (err) {
				_d = true;
				_e = err;
			} finally {
				try {
					if (!_n && _i["return"]) _i["return"]();
				} finally {
					if (_d) throw _e;
				}
			}

			return _arr;
		}

		return function (arr, i) {
			if (Array.isArray(arr)) {
				return arr;
			} else if (Symbol.iterator in Object(arr)) {
				return sliceIterator(arr, i);
			} else {
				throw new TypeError("Invalid attempt to destructure non-iterable instance");
			}
		};
	}();

	exports.default = _ember.default.Helper.extend({
		compute: function compute(_ref) {
			var _ref2 = _slicedToArray(_ref, 1),
			    value = _ref2[0];

			if (!value) {
				_ember.default.warn("Called date-format with null", false, { id: 'met.helper.date-format.null' });
				return "1970-01-01";
			}

			if (typeof value === 'number') {
				_ember.default.warn("Called date-format with number", false, { id: 'met.helper.date-format.number' });
				value = new Date(value);
			}

			var year = value.getFullYear().toString();
			var month = (value.getMonth() + 1).toString();
			var day = value.getDate().toString();

			if (month.length < 2) {
				month = "0" + month;
			}
			if (day.length < 2) {
				day = "0" + day;
			}

			return year + "-" + month + "-" + day;
		}
	});
});
define('micro-expense-tracker/helpers/ember-power-select-is-group', ['exports', 'ember-power-select/helpers/ember-power-select-is-group'], function (exports, _emberPowerSelectIsGroup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsGroup.default;
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectIsGroup', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsGroup.emberPowerSelectIsGroup;
    }
  });
});
define('micro-expense-tracker/helpers/ember-power-select-is-selected', ['exports', 'ember-power-select/helpers/ember-power-select-is-selected'], function (exports, _emberPowerSelectIsSelected) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsSelected.default;
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectIsSelected', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsSelected.emberPowerSelectIsSelected;
    }
  });
});
define('micro-expense-tracker/helpers/ember-power-select-true-string-if-present', ['exports', 'ember-power-select/helpers/ember-power-select-true-string-if-present'], function (exports, _emberPowerSelectTrueStringIfPresent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectTrueStringIfPresent.default;
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectTrueStringIfPresent', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectTrueStringIfPresent.emberPowerSelectTrueStringIfPresent;
    }
  });
});
define('micro-expense-tracker/helpers/eq', ['exports', 'ember', 'ember-truth-helpers/helpers/equal'], function (exports, _ember, _equal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (_ember.default.Helper) {
    forExport = _ember.default.Helper.helper(_equal.equalHelper);
  } else if (_ember.default.HTMLBars.makeBoundHelper) {
    forExport = _ember.default.HTMLBars.makeBoundHelper(_equal.equalHelper);
  }

  exports.default = forExport;
});
define('micro-expense-tracker/helpers/gt', ['exports', 'ember', 'ember-truth-helpers/helpers/gt'], function (exports, _ember, _gt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (_ember.default.Helper) {
    forExport = _ember.default.Helper.helper(_gt.gtHelper);
  } else if (_ember.default.HTMLBars.makeBoundHelper) {
    forExport = _ember.default.HTMLBars.makeBoundHelper(_gt.gtHelper);
  }

  exports.default = forExport;
});
define('micro-expense-tracker/helpers/gte', ['exports', 'ember', 'ember-truth-helpers/helpers/gte'], function (exports, _ember, _gte) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (_ember.default.Helper) {
    forExport = _ember.default.Helper.helper(_gte.gteHelper);
  } else if (_ember.default.HTMLBars.makeBoundHelper) {
    forExport = _ember.default.HTMLBars.makeBoundHelper(_gte.gteHelper);
  }

  exports.default = forExport;
});
define('micro-expense-tracker/helpers/is-after', ['exports', 'ember', 'micro-expense-tracker/config/environment', 'ember-moment/helpers/is-after'], function (exports, _ember, _environment, _isAfter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _isAfter.default.extend({
    globalAllowEmpty: !!_ember.default.get(_environment.default, 'moment.allowEmpty')
  });
});
define('micro-expense-tracker/helpers/is-array', ['exports', 'ember', 'ember-truth-helpers/helpers/is-array'], function (exports, _ember, _isArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (_ember.default.Helper) {
    forExport = _ember.default.Helper.helper(_isArray.isArrayHelper);
  } else if (_ember.default.HTMLBars.makeBoundHelper) {
    forExport = _ember.default.HTMLBars.makeBoundHelper(_isArray.isArrayHelper);
  }

  exports.default = forExport;
});
define('micro-expense-tracker/helpers/is-before', ['exports', 'ember', 'micro-expense-tracker/config/environment', 'ember-moment/helpers/is-before'], function (exports, _ember, _environment, _isBefore) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _isBefore.default.extend({
    globalAllowEmpty: !!_ember.default.get(_environment.default, 'moment.allowEmpty')
  });
});
define('micro-expense-tracker/helpers/is-between', ['exports', 'ember', 'micro-expense-tracker/config/environment', 'ember-moment/helpers/is-between'], function (exports, _ember, _environment, _isBetween) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _isBetween.default.extend({
    globalAllowEmpty: !!_ember.default.get(_environment.default, 'moment.allowEmpty')
  });
});
define('micro-expense-tracker/helpers/is-equal', ['exports', 'ember-truth-helpers/helpers/is-equal'], function (exports, _isEqual) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isEqual.default;
    }
  });
  Object.defineProperty(exports, 'isEqual', {
    enumerable: true,
    get: function () {
      return _isEqual.isEqual;
    }
  });
});
define('micro-expense-tracker/helpers/is-same-or-after', ['exports', 'ember', 'micro-expense-tracker/config/environment', 'ember-moment/helpers/is-same-or-after'], function (exports, _ember, _environment, _isSameOrAfter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _isSameOrAfter.default.extend({
    globalAllowEmpty: !!_ember.default.get(_environment.default, 'moment.allowEmpty')
  });
});
define('micro-expense-tracker/helpers/is-same-or-before', ['exports', 'ember', 'micro-expense-tracker/config/environment', 'ember-moment/helpers/is-same-or-before'], function (exports, _ember, _environment, _isSameOrBefore) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _isSameOrBefore.default.extend({
    globalAllowEmpty: !!_ember.default.get(_environment.default, 'moment.allowEmpty')
  });
});
define('micro-expense-tracker/helpers/is-same', ['exports', 'ember', 'micro-expense-tracker/config/environment', 'ember-moment/helpers/is-same'], function (exports, _ember, _environment, _isSame) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _isSame.default.extend({
    globalAllowEmpty: !!_ember.default.get(_environment.default, 'moment.allowEmpty')
  });
});
define('micro-expense-tracker/helpers/lt', ['exports', 'ember', 'ember-truth-helpers/helpers/lt'], function (exports, _ember, _lt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (_ember.default.Helper) {
    forExport = _ember.default.Helper.helper(_lt.ltHelper);
  } else if (_ember.default.HTMLBars.makeBoundHelper) {
    forExport = _ember.default.HTMLBars.makeBoundHelper(_lt.ltHelper);
  }

  exports.default = forExport;
});
define('micro-expense-tracker/helpers/lte', ['exports', 'ember', 'ember-truth-helpers/helpers/lte'], function (exports, _ember, _lte) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (_ember.default.Helper) {
    forExport = _ember.default.Helper.helper(_lte.lteHelper);
  } else if (_ember.default.HTMLBars.makeBoundHelper) {
    forExport = _ember.default.HTMLBars.makeBoundHelper(_lte.lteHelper);
  }

  exports.default = forExport;
});
define('micro-expense-tracker/helpers/moment-add', ['exports', 'ember', 'micro-expense-tracker/config/environment', 'ember-moment/helpers/moment-add'], function (exports, _ember, _environment, _momentAdd) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _momentAdd.default.extend({
    globalAllowEmpty: !!_ember.default.get(_environment.default, 'moment.allowEmpty')
  });
});
define('micro-expense-tracker/helpers/moment-calendar', ['exports', 'ember', 'micro-expense-tracker/config/environment', 'ember-moment/helpers/moment-calendar'], function (exports, _ember, _environment, _momentCalendar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _momentCalendar.default.extend({
    globalAllowEmpty: !!_ember.default.get(_environment.default, 'moment.allowEmpty')
  });
});
define('micro-expense-tracker/helpers/moment-duration', ['exports', 'ember-moment/helpers/moment-duration'], function (exports, _momentDuration) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentDuration.default;
    }
  });
});
define('micro-expense-tracker/helpers/moment-format', ['exports', 'ember', 'micro-expense-tracker/config/environment', 'ember-moment/helpers/moment-format'], function (exports, _ember, _environment, _momentFormat) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _momentFormat.default.extend({
    globalAllowEmpty: !!_ember.default.get(_environment.default, 'moment.allowEmpty')
  });
});
define('micro-expense-tracker/helpers/moment-from-now', ['exports', 'ember', 'micro-expense-tracker/config/environment', 'ember-moment/helpers/moment-from-now'], function (exports, _ember, _environment, _momentFromNow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _momentFromNow.default.extend({
    globalAllowEmpty: !!_ember.default.get(_environment.default, 'moment.allowEmpty')
  });
});
define('micro-expense-tracker/helpers/moment-from', ['exports', 'ember', 'micro-expense-tracker/config/environment', 'ember-moment/helpers/moment-from'], function (exports, _ember, _environment, _momentFrom) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _momentFrom.default.extend({
    globalAllowEmpty: !!_ember.default.get(_environment.default, 'moment.allowEmpty')
  });
});
define('micro-expense-tracker/helpers/moment-subtract', ['exports', 'ember', 'micro-expense-tracker/config/environment', 'ember-moment/helpers/moment-subtract'], function (exports, _ember, _environment, _momentSubtract) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _momentSubtract.default.extend({
    globalAllowEmpty: !!_ember.default.get(_environment.default, 'moment.allowEmpty')
  });
});
define('micro-expense-tracker/helpers/moment-to-date', ['exports', 'ember', 'micro-expense-tracker/config/environment', 'ember-moment/helpers/moment-to-date'], function (exports, _ember, _environment, _momentToDate) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _momentToDate.default.extend({
    globalAllowEmpty: !!_ember.default.get(_environment.default, 'moment.allowEmpty')
  });
});
define('micro-expense-tracker/helpers/moment-to-now', ['exports', 'ember', 'micro-expense-tracker/config/environment', 'ember-moment/helpers/moment-to-now'], function (exports, _ember, _environment, _momentToNow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _momentToNow.default.extend({
    globalAllowEmpty: !!_ember.default.get(_environment.default, 'moment.allowEmpty')
  });
});
define('micro-expense-tracker/helpers/moment-to', ['exports', 'ember', 'micro-expense-tracker/config/environment', 'ember-moment/helpers/moment-to'], function (exports, _ember, _environment, _momentTo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _momentTo.default.extend({
    globalAllowEmpty: !!_ember.default.get(_environment.default, 'moment.allowEmpty')
  });
});
define('micro-expense-tracker/helpers/moment-unix', ['exports', 'ember-moment/helpers/unix'], function (exports, _unix) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _unix.default;
    }
  });
  Object.defineProperty(exports, 'unix', {
    enumerable: true,
    get: function () {
      return _unix.unix;
    }
  });
});
define('micro-expense-tracker/helpers/moment', ['exports', 'ember-moment/helpers/moment'], function (exports, _moment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _moment.default;
    }
  });
});
define('micro-expense-tracker/helpers/not-eq', ['exports', 'ember', 'ember-truth-helpers/helpers/not-equal'], function (exports, _ember, _notEqual) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (_ember.default.Helper) {
    forExport = _ember.default.Helper.helper(_notEqual.notEqualHelper);
  } else if (_ember.default.HTMLBars.makeBoundHelper) {
    forExport = _ember.default.HTMLBars.makeBoundHelper(_notEqual.notEqualHelper);
  }

  exports.default = forExport;
});
define('micro-expense-tracker/helpers/not', ['exports', 'ember', 'ember-truth-helpers/helpers/not'], function (exports, _ember, _not) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (_ember.default.Helper) {
    forExport = _ember.default.Helper.helper(_not.notHelper);
  } else if (_ember.default.HTMLBars.makeBoundHelper) {
    forExport = _ember.default.HTMLBars.makeBoundHelper(_not.notHelper);
  }

  exports.default = forExport;
});
define('micro-expense-tracker/helpers/now', ['exports', 'ember-moment/helpers/now'], function (exports, _now) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _now.default;
    }
  });
});
define('micro-expense-tracker/helpers/or', ['exports', 'ember', 'ember-truth-helpers/helpers/or'], function (exports, _ember, _or) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (_ember.default.Helper) {
    forExport = _ember.default.Helper.helper(_or.orHelper);
  } else if (_ember.default.HTMLBars.makeBoundHelper) {
    forExport = _ember.default.HTMLBars.makeBoundHelper(_or.orHelper);
  }

  exports.default = forExport;
});
define('micro-expense-tracker/helpers/pad-end', ['exports', 'ember-pad/helpers/pad-end'], function (exports, _padEnd) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _padEnd.default;
    }
  });
  Object.defineProperty(exports, 'padEnd', {
    enumerable: true,
    get: function () {
      return _padEnd.padEnd;
    }
  });
});
define('micro-expense-tracker/helpers/pad-start', ['exports', 'ember-pad/helpers/pad-start'], function (exports, _padStart) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _padStart.default;
    }
  });
  Object.defineProperty(exports, 'padStart', {
    enumerable: true,
    get: function () {
      return _padStart.padStart;
    }
  });
});
define('micro-expense-tracker/helpers/pad', ['exports', 'ember-pad/helpers/pad'], function (exports, _pad) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _pad.default;
    }
  });
  Object.defineProperty(exports, 'pad', {
    enumerable: true,
    get: function () {
      return _pad.pad;
    }
  });
});
define("micro-expense-tracker/helpers/percent-format", ["exports", "ember"], function (exports, _ember) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _slicedToArray = function () {
		function sliceIterator(arr, i) {
			var _arr = [];
			var _n = true;
			var _d = false;
			var _e = undefined;

			try {
				for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
					_arr.push(_s.value);

					if (i && _arr.length === i) break;
				}
			} catch (err) {
				_d = true;
				_e = err;
			} finally {
				try {
					if (!_n && _i["return"]) _i["return"]();
				} finally {
					if (_d) throw _e;
				}
			}

			return _arr;
		}

		return function (arr, i) {
			if (Array.isArray(arr)) {
				return arr;
			} else if (Symbol.iterator in Object(arr)) {
				return sliceIterator(arr, i);
			} else {
				throw new TypeError("Invalid attempt to destructure non-iterable instance");
			}
		};
	}();

	exports.default = _ember.default.Helper.extend({
		compute: function compute(_ref, hash) {
			var _ref2 = _slicedToArray(_ref, 1),
			    value = _ref2[0];

			if (hash.isFraction) {
				return (value * 100).toFixed(2) + "%";
			} else {
				return value.toFixed(2) + "%";
			}
		}
	});
});
define('micro-expense-tracker/helpers/perform', ['exports', 'ember', 'ember-concurrency/-helpers'], function (exports, _ember, _helpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.performHelper = performHelper;
  function performHelper(args, hash) {
    return (0, _helpers.taskHelperClosure)('perform', args, hash);
  }

  exports.default = _ember.default.Helper.helper(performHelper);
});
define('micro-expense-tracker/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('micro-expense-tracker/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('micro-expense-tracker/helpers/slugify', ['exports', 'ember', 'npm:diacritic'], function (exports, _ember, _npmDiacritic) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.slugify = slugify;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  function slugify(_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        text = _ref2[0];

    if (typeof text === "undefined" || text === null || text === undefined) {
      return 'n/a';
    }

    text = _npmDiacritic.default.clean(text);
    text = text.toLowerCase();
    text = text.replace(/[^a-z0-9-]+/g, '-');
    text = text.replace(/(^-+|-+$)/g, '');

    return text;
  }

  exports.default = _ember.default.Helper.helper(slugify);
});
define('micro-expense-tracker/helpers/t', ['exports', 'ember-i18n/helper'], function (exports, _helper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _helper.default;
    }
  });
});
define('micro-expense-tracker/helpers/task', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  function _toArray(arr) {
    return Array.isArray(arr) ? arr : Array.from(arr);
  }

  function taskHelper(_ref) {
    var _ref2 = _toArray(_ref),
        task = _ref2[0],
        args = _ref2.slice(1);

    return task._curry.apply(task, _toConsumableArray(args));
  }

  exports.default = _ember.default.Helper.helper(taskHelper);
});
define('micro-expense-tracker/helpers/unix', ['exports', 'ember-moment/helpers/unix'], function (exports, _unix) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _unix.default;
    }
  });
  Object.defineProperty(exports, 'unix', {
    enumerable: true,
    get: function () {
      return _unix.unix;
    }
  });
});
define('micro-expense-tracker/helpers/xor', ['exports', 'ember', 'ember-truth-helpers/helpers/xor'], function (exports, _ember, _xor) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (_ember.default.Helper) {
    forExport = _ember.default.Helper.helper(_xor.xorHelper);
  } else if (_ember.default.HTMLBars.makeBoundHelper) {
    forExport = _ember.default.HTMLBars.makeBoundHelper(_xor.xorHelper);
  }

  exports.default = forExport;
});
define('micro-expense-tracker/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'micro-expense-tracker/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _config$APP = _environment.default.APP,
      name = _config$APP.name,
      version = _config$APP.version;
  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('micro-expense-tracker/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('micro-expense-tracker/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('micro-expense-tracker/initializers/ember-concurrency', ['exports', 'ember-concurrency'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-concurrency',
    initialize: function initialize() {}
  };
});
define('micro-expense-tracker/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/index'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('micro-expense-tracker/initializers/ember-i18n', ['exports', 'ember-i18n/initializers/ember-i18n'], function (exports, _emberI18n) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberI18n.default;
});
define('micro-expense-tracker/initializers/export-application-global', ['exports', 'ember', 'micro-expense-tracker/config/environment'], function (exports, _ember, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember.default.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('micro-expense-tracker/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("micro-expense-tracker/initializers/register-model", ["exports", "micro-expense-tracker/models/category", "micro-expense-tracker/models/expense", "micro-expense-tracker/models/month"], function (exports, _category, _expense, _month) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize(application) {
    application.register('model:category', _category.default, { instantiate: false });
    application.register('model:expense', _expense.default, { instantiate: false });
    application.register('model:month', _month.default, { instantiate: false });
  }

  exports.default = {
    name: 'register-model',
    initialize: initialize
  };
});
define('micro-expense-tracker/initializers/store', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('micro-expense-tracker/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('micro-expense-tracker/initializers/truth-helpers', ['exports', 'ember', 'ember-truth-helpers/utils/register-helper', 'ember-truth-helpers/helpers/and', 'ember-truth-helpers/helpers/or', 'ember-truth-helpers/helpers/equal', 'ember-truth-helpers/helpers/not', 'ember-truth-helpers/helpers/is-array', 'ember-truth-helpers/helpers/not-equal', 'ember-truth-helpers/helpers/gt', 'ember-truth-helpers/helpers/gte', 'ember-truth-helpers/helpers/lt', 'ember-truth-helpers/helpers/lte'], function (exports, _ember, _registerHelper, _and, _or, _equal, _not, _isArray, _notEqual, _gt, _gte, _lt, _lte) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() /* container, application */{

    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (_ember.default.Helper) {
      return;
    }

    (0, _registerHelper.registerHelper)('and', _and.andHelper);
    (0, _registerHelper.registerHelper)('or', _or.orHelper);
    (0, _registerHelper.registerHelper)('eq', _equal.equalHelper);
    (0, _registerHelper.registerHelper)('not', _not.notHelper);
    (0, _registerHelper.registerHelper)('is-array', _isArray.isArrayHelper);
    (0, _registerHelper.registerHelper)('not-eq', _notEqual.notEqualHelper);
    (0, _registerHelper.registerHelper)('gt', _gt.gtHelper);
    (0, _registerHelper.registerHelper)('gte', _gte.gteHelper);
    (0, _registerHelper.registerHelper)('lt', _lt.ltHelper);
    (0, _registerHelper.registerHelper)('lte', _lte.lteHelper);
  }

  exports.default = {
    name: 'truth-helpers',
    initialize: initialize
  };
});
define("micro-expense-tracker/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('micro-expense-tracker/instance-initializers/ember-i18n', ['exports', 'ember-i18n/instance-initializers/ember-i18n'], function (exports, _emberI18n) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberI18n.default;
});
define("micro-expense-tracker/locales/en/config", ["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		// rtl: [true|FALSE],
		//
		// pluralForm: function(count) {
		//   if (count === 0) { return 'zero'; }
		//   if (count === 1) { return 'one'; }
		//   if (count === 2) { return 'two'; }
		//   if (count < 5) { return 'few'; }
		//   if (count >= 5) { return 'many'; }
		//   return 'other';
		// }
	};
});
define("micro-expense-tracker/locales/en/translations", ["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		app: {
			title: "MET - Micro Expense Tracker",
			subtitle: "Track your daily expenses faster than you can type!",
			page_title: "[MET] Micro Expense Tracker"
		},
		common: {
			currency_wrap: '$~~PRICE~~'
		},
		navigation: {
			main_menu: 'Main menu:',
			categories: "Categories",
			summary: "Summary",
			expenses: "Expenses",
			options: "Options"
		},
		components: {
			date_switcher: {
				return: 'Return to current month'
			},
			options: {
				import_data: {
					header: "Import data",
					warning: "Please remember that importing data will remove all the existing data. Please ensure you have a backup.",
					step_1_header: "Step 1",
					step_1_body: "Select the file",
					step_1_invalid_file: "This is not a valid import file.",
					step_2_header: "Step 2",
					step_2_body: "Data summary",
					step_2_categories: "Categories",
					step_2_expenses: "Expenses",
					step_2_expense_months: "Expense months",
					button_import: "Import",
					button_cancel: "Cancel"
				}
			}
		},
		footer: {
			made_by: 'Website made by <a href="http://mauft.com">Maurycy Zarzycki Mauft.com</a>.',
			thanks: 'MET is powered by <a href="http://emberjs.com/">Ember.js</a>, the best framework for single-page browser apps.',

			header_1: "Security & Privacy",
			header_2: "Data storage",
			header_3: "Help",
			body_1: "Micro Expense Tracker is designed to not send any information you enter over the internet, thus making it as secure as your browser and computer. I do my best to ensure no unauthorized people can access the hosted files and modify them. Nevertheless I take no responsibility or liability, so far as legally possible, for any damages or stolen information.",
			body_2: "Micro Expense Tracker uses local storage for storing everything you enter and as such it is suspectible for being lost in certain cases. Because it was made primarily for personal use it is unsure whether a more elaborate mechanisms will be added in the future. Use with caution!",
			body_3: "If you like this project, want to help it grow or have questions please use the <a href='https://github.com/RetrocadeNet/MicroExpenseTracker/issues'>issues board</a> on GitHub. If you need to contact the author please use <a href='mailto:maurycy.zarzycki@mauft.com'>maurycy.zarzycki@mauft.com</a>"
		},
		section: {
			install: {
				currency_hint: "You can customize the currency later in the options.",
				start: "Start"
			},

			categories: {
				title: "Expense categories",

				index: {
					operations: "Operations",
					add_new_category: "Add new category",
					name_path: "Name",
					actions: "Actions",
					categories: "Categories",
					empty_row: "There are no categories here. To add one, press the button <i>{{button}}</i>.",
					action: {
						edit: 'Edit category "{{category}}"',
						delete: 'Delete category "{{category}}"'
					}
				},
				new: {
					title: "Create a new category"
				},
				edit: {
					title: 'Edit category "{{title}}"'
				},
				form: {
					name: "Name",
					parent: "Parent category",
					parent_none: "&lt;top-level category&gt;",
					save: "Save",
					cancel: "Cancel"
				},
				notifications: {
					created: 'Category "{{{name}}}" was added successfully.',
					deleted: 'Category "{{{name}}}" was permanently removed.',
					updated: 'Category "{{{name}}}" was updated successfully.',
					save_failed: 'Failed to save the category, reason: {{error}}.',
					missing_category_update: "The edited category no longer exists and cannot be modified."
				}
			},
			expenses: {
				title: 'Expenses',

				index: {
					operations: "Operations",
					add_new_receipt: "Add a new receipt",
					product: "Product",
					final_price: "Final Price",
					missing_category: "&lt;no category&gt;",
					category: "Category",
					expense_date: "Expense date",
					missing_expense_date: "&lt;no date&gt;",
					actions: "Actions",
					expenses: "Expenses",
					empty_row: "No expenses this month.",
					action: {
						edit: 'Edit expense "{{expense}}"',
						delete: 'Delete expense "{{expense}}"'
					},
					filtering: 'Filtering',
					filters_none: "None",
					filter_by_category: 'Filter by this category',
					filters: {
						by_category: "By category"
					}
				},

				edit: {
					title: "Edit expense {{name}} from {{date}}",
					save: "Save",
					cancel: "Cancel",
					receipt_date: "Purchase date"
				},

				edit_expense_component: {
					name: "Expense name",
					price: "Price",
					category: "Category",
					discount: "Discount",
					name_placeholder: "Expense name",
					price_placeholder: "Price",
					category_placeholder: "Category",
					discount_placeholder: "Discount"
				},

				new_receipt: {
					title: "Add a new receipt",
					save: "Save",
					cancel: "Cancel",
					receipt_date: "Receipt date",
					expenses: "Expenses",
					name_placeholder: "Expense name",
					price_placeholder: "Price",
					category_placeholder: "Category",
					discount_placeholder: "Discount"
				},

				notifications: {
					modified_expense: 'Expense was updated.',
					created_receipt: 'Receipt was added successfully.',
					fix_form: 'Errors have been found in the form. Please fix the highlighted fields.',
					deleted: 'Expense "{{{name}}}" was permanently removed.'
				}
			},

			summary: {
				title: 'Expenses summary',
				no_category: 'Without category',
				total: 'Total',
				filter_by_category: 'Show expenses from this category'
			},

			options: {
				headers: {
					language: "Language",
					misc: "Misc",
					storage: "Storage"
				},
				language: {
					lang: "Interface language",
					currency: "Currency",
					currency_preview: "Preview"
				},
				storage: {
					import_export: {
						header: "Import/Export",
						hint: "Importing data will delete all the data you currently have in storage! It's advisable to first export a backup copy.",
						import: "Import",
						export: "Export"
					},
					delete: {
						header: "Delete data",
						paragraph: "This page allows you to delete data in your database. The most obvious usecase is for debugging and development purposes but maybe you have another reason to do that. Please be warned that using this will delete your data without ability to undo, although backups should be made automatically.",
						checkbox1: "I confirm that I know that using this feature I can lose all or some of my data forever and I won't complain if I deleted it despite all those warnings.",
						checkbox2: "I promise I made a manual backup of my data.",
						checkbox3: "I really know what I am doing.",
						delete_index: "Delete {{index}}"
					}
				},
				notifications: {
					import_success: "Data has been imported successfully!"
				}
			}
		}
	};
});
define("micro-expense-tracker/locales/pl/config", ["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		// rtl: [true|FALSE],
		//
		// pluralForm: function(count) {
		//   if (count === 0) { return 'zero'; }
		//   if (count === 1) { return 'one'; }
		//   if (count === 2) { return 'two'; }
		//   if (count < 5) { return 'few'; }
		//   if (count >= 5) { return 'many'; }
		//   return 'other';
		// }
	};
});
define("micro-expense-tracker/locales/pl/translations", ["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		app: {
			title: "MET - Mikrowydatnik",
			subtitle: "Super szybkie śledzenie budżetu domowego!",
			page_title: "[MET] Mikrowydatnik"
		},
		common: {
			currency_wrap: '~~PRICE~~ zł'
		},
		navigation: {
			main_menu: 'Menu główne:',
			categories: "Kategorie",
			summary: "Statystyki",
			expenses: "Wydatki",
			options: "Opcje"
		},
		components: {
			date_switcher: {
				return: 'Cofnij do aktualnego miesiąca'
			},
			options: {
				import_data: {
					header: "Importuj dane",
					warning: "Zaimportowanie danych spowoduje usunięcie danych obecnie zapisanych w systemie! Proszę, zrób kopię zapasową.",
					step_1_header: "Krok 1",
					step_1_body: "Wybierz plik",
					step_1_invalid_file: "Niepoprawny format pliku.",
					step_2_header: "Krok 2",
					step_2_body: "Podsumowanie danych",
					step_2_categories: "Kategorie",
					step_2_expenses: "Wydatki",
					step_2_expense_months: "Miesiące z wydatkami",
					button_import: "Importuj",
					button_cancel: "Anuluj"
				}
			}
		},
		footer: {
			made_by: 'Strona stworzona przez <a href="http://mauft.com">Maurycy Zarzycki Mauft.com</a>.',
			thanks: 'MET powstał w oparciu o <a href="http://emberjs.com/">Ember.js</a>, najlepszy silnik do jednostronowych aplikacji.',

			header_1: "Bezpieczeństwo i prywatnośc",
			header_2: "Przechowywanie danych",
			header_3: "Pomoc",

			body_1: "Mikrowydatnik MET został zaprojektwany tak, by nie wysyłać żadnych informacji przez internet, dzięki czemu w założeniach jest tak bezpieczny jak twoja przeglądarka i komputer. Dokładamy wszelkich starań by nie dawać dostepu do zmiany plików projektu osobom trzecim. Niemniej jednak używając tego narzędzia robisz to na własną odpowiedzialność.",
			body_2: "Mikrowydatnik MET używa lokalnej pamięci przeglądarki by przechowywać dane, co powoduje, że można je dość łatwo utracić w niektórych przypadkach. Ponieważ projekt powstał głównie z potrzeby osobistej nie ma gwarancji, że kiedykolwiek powstaną inne mechanizmy.",
			body_3: "Jeżeli podoba ci się ten projekt i chcesz go wesprzeć lub masz pytania użyj proszę <a href='https://github.com/RetrocadeNet/MicroExpenseTracker/issues'>zgłaszania błędów</a> na GitHubie (wbrew nazwie można tam też zgłaszać pytania i nie tylko). Jeżeli potrzebujesz skontaktować się z autorem napisz na <a href='mailto:maurycy.zarzycki@mauft.com'>maurycy.zarzycki@mauft.com</a>"
		},
		section: {
			install: {
				currency_hint: "Walutę można dostosować w opcjach.",
				start: "Rozpocznij pracę"
			},

			categories: {
				title: "Kategorie wydatków",

				index: {
					operations: "Operacje",
					add_new_category: "Dodaj nową kategorię",
					name_path: "Nazwa",
					actions: "Akcje",
					categories: "Kategorie",
					empty_row: "Użyj przycisku <i>{{button}}</i> aby dodać pierwszą kategorię.",
					action: {
						edit: 'Edytuj kategorię "{{category}}"',
						delete: 'Usuń kategorię "{{category}}"'
					}
				},
				new: {
					title: "Stwórz nową kategorię"
				},
				edit: {
					title: 'Edytuj kategorię "{{title}}"'
				},
				form: {
					name: "Nazwa",
					parent: "Kategoria nadrzędna",
					parent_none: "<kategoria głównego poziomu>",
					save: "Zapisz",
					cancel: "Anuluj"
				},
				notifications: {
					created: 'Kategoria "{{{name}}}" została dodana.',
					deleted: 'Kategoria "{{{name}}}" została usunięta.',
					updated: 'Kategoria "{{{name}}}" została zaktualizowana.',
					save_failed: 'Nie udało się zapisać kategorii, powód: {{error}}.',
					missing_category_update: 'Edytowana kategoria przestała istnieć i nie może zostać zmodyfikowana.'
				}
			},

			expenses: {
				title: 'Wydatki',

				index: {
					operations: "Operacje",
					add_new_receipt: "Dodaj paragon",
					product: "Wydatek",
					final_price: "Koszt",
					missing_category: "&lt;bez kategorii&gt;",
					category: "Kategoria",
					expense_date: "Data wydatku",
					missing_expense_date: "&lt;brak daty&gt;",
					actions: "Akcje",
					expenses: "Wydatki",
					empty_row: "Brak wydaktów w tym miesiącu.",
					action: {
						edit: 'Edytuj wydatek "{{expense}}"',
						delete: 'Usuń wydatek "{{expense}}"'
					},
					filtering: 'Filtrowanie',
					filters_none: "Brak",
					filter_by_category: 'Filtruj po tej kategorii',
					filters: {
						by_category: "Po kategorii"
					}
				},

				edit: {
					title: "Edytuj wydatek {{name}} z {{date}}",
					save: "Zapisz",
					cancel: "Anuluj",
					receipt_date: "Data zakupu"
				},

				edit_expense_component: {
					name: "Nazwa produktu",
					price: "Cena",
					category: "Kategoria",
					discount: "Rabat",
					name_placeholder: "Nazwa wydatku",
					price_placeholder: "Cena",
					category_placeholder: "Kategoria",
					discount_placeholder: "Rabat"
				},

				new_receipt: {
					title: "Dodaj paragon",
					save: "Zapisz",
					cancel: "Anuluj",
					receipt_date: "Data paragonu",
					expenses: "Wydatki"
				},

				notifications: {
					modified_expense: 'Zaktualizowano wydatek.',
					created_receipt: 'Dodano paragon.',
					fix_form: 'Proimy poprawić błedy w formularzu.',
					deleted: 'Wydatek "{{{name}}}" został usunięty.'
				}
			},

			summary: {
				title: 'Podsumowanie wydatków',
				no_category: 'Bez kategorii',
				total: 'W sumie',
				filter_by_category: 'Wyświetl wydatki w tej kategorii'
			},

			options: {
				headers: {
					language: "Język",
					misc: "Różne",
					storage: "Dane"
				},
				language: {
					lang: "Język interfejsu",
					currency: "Waluta",
					currency_preview: "Podgląd"
				},
				storage: {
					import_export: {
						header: "Importuj/Exportuj",
						hint: "Zaimportowanie danych spowoduje usunięcie danych obecnie zapisanych w systemie! Proszę, zrób kopię zapasową.",
						import: "Importuj",
						export: "Exportuj"
					},
					delete: {
						header: "Usuwanie danych",
						paragraph: "Na tej stronie możesz usunąć dane z bazy danych aplikacji. Najbardziej oczywistym zastosowaniem jest testowanie aplikacji, ale być może masz inny powód by to robić. Proszę, miej na uwadze to, że możesz utracić dane bez możliwości cofnięciu operacji, aczkolwiek aplikacja powinna wykonać automatycznie kopie zapasowe przed usunięciem czegokolwiek.",
						checkbox1: "Potwierdzam, że wiem, iż używanie tych opcji może skończyć się częściową lub całkowitą utratą danych bez możliwości ich odzyskania i nie będe narzekać jeżeli coś utracę pomimo tych ostrzeżeń..",
						checkbox2: "Obiecuję, że mam ręcznie wykonaną kopię zapasową danych.",
						checkbox3: "Naprawdę, wiem co robię.",
						delete_index: "Usuń {{index}}"
					}
				},
				notifications: {
					import_success: "Import danych się powiódł!"
				}
			}
		}
	};
});
define('micro-expense-tracker/models/base-model', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Object.extend({
		modelDaos: _ember.default.inject.service('dao/model-daos'),
		i18n: _ember.default.inject.service(),

		id: null,
		errors: [],

		save: function save() {
			this._getSpecificService().modelSaved(this);
		},
		delete: function _delete() {
			this._getSpecificService().modelDeleted(this);
		},
		clone: function clone() {
			var clone = this._getSpecificService().create(this.toJson());
			clone.set('id', null);
			clone.afterLoad();

			return clone;
		},
		toJson: function toJson() {
			return {
				id: this.get('id')
			};
		},
		setFieldsFrom: function setFieldsFrom(source) {
			var _this = this;

			var fieldNames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			if (!fieldNames) {
				fieldNames = Object.keys(source.toJson());
				var idIndex = fieldNames.indexOf('id');
				fieldNames.splice(idIndex, 1);
			}

			fieldNames.forEach(function (name) {
				return _this.set(name, source.get(name));
			});
		}
	});
});
define("micro-expense-tracker/models/category", ["exports", "ember", "micro-expense-tracker/models/base-model", "lodash"], function (exports, _ember, _baseModel, _lodash) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _baseModel.default.extend({
		name: null,
		parentId: null,

		parent: _ember.default.computed('parentId', function () {
			return this.get('modelDaos.category').getById(this.get('parentId'));
		}),

		indentedName: _ember.default.computed('name', 'parentId', 'parent.indentedName', function () {
			var parent = this.get('parent');
			var indent = "";

			while (parent) {
				indent += "&nbsp;-&nbsp;";
				parent = parent.get('parent');
			}

			return indent + this.get('name');
		}),

		namePath: _ember.default.computed('name', 'parent', 'parent.parent', 'parent.namePath', function () {
			var parent = this.get('parent');

			if (parent && parent.get('id')) {
				return parent.get('namePath') + " -> " + this.get('name');
			} else {
				return this.get('name');
			}
		}),

		namePathForHtml: _ember.default.computed('name', 'parent', 'parent.parent', 'parent.namePath', function () {
			var parent = this.get('parent');

			if (parent && parent.get('id')) {
				return parent.get('namePath') + " -> <strong>" + this.get('name') + "</strong>";
			} else {
				return "<strong>" + this.get('name') + "</strong>";
			}
		}),

		rootName: _ember.default.computed('name', 'parent', 'parent.parent', 'parent.name', 'parent.rootName', function () {
			var name = this.get('name');
			var parent = this.get('parent');

			while (parent && parent.get('id')) {
				name = parent.get('name');
				parent = parent.get('parent');
			}

			return name;
		}),

		hasChildren: _ember.default.computed(function () {
			return this.getChildren().length > 0;
		}),

		getChildren: function getChildren() {
			var _this = this;

			return this.get('modelDaos.category').getAll().filter(function (category) {
				return category.get('parentId') === _this.get('id');
			});
		},
		isCategory: function isCategory(category) {
			return this === category || this.get('parent.id') && this.get('parent').isCategory(category);
		},
		isChildOf: function isChildOf(category) {
			var parent = this.get('parent');

			return category && parent && (parent === category || parent.isChildOf(category));
		},
		isParentOf: function isParentOf(category) {
			var children = this.getChildren();

			return _lodash.default.some(children, function (child) {
				return child === category || child.isParentOf(category);
			});
		},
		afterLoad: function afterLoad() {
			this.set('id', parseInt(this.get('id')) || null);
			this.set('parentId', parseInt(this.get('parentId')) || null);
		},
		delete: function _delete() {
			var _this2 = this;

			this.getChildren().forEach(function (category) {
				category.set('parentId', _this2.get('parentId'));
				category.save();
			});

			this._super();
		},
		toJson: function toJson() {
			return {
				id: this.get('id'),
				name: this.get('name'),
				parentId: this.get('parentId')
			};
		},
		_getSpecificService: function _getSpecificService() {
			return this.get('modelDaos.category');
		}
	});
});
define("micro-expense-tracker/models/expense", ["exports", "ember", "micro-expense-tracker/models/base-model"], function (exports, _ember, _baseModel) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _baseModel.default.extend({
		name: "",
		price: null,
		discount: 0,
		categoryId: null,
		purchasedAt: null,
		createdAt: null,
		updatedAt: null,

		category: _ember.default.computed('categoryId', function () {
			return this.get('modelDaos.category').getById(this.get('categoryId'));
		}),

		idIndex: _ember.default.computed('id', function () {
			return parseInt(this.get('id').split('-')[2]);
		}),

		realPrice: _ember.default.computed('price', 'discount', function () {
			return this.get('price') * (1 - this.get('discount'));
		}),

		discountPercent: _ember.default.computed('discount', function () {
			return Math.round(this.get('discount') * 100);
		}),

		afterLoad: function afterLoad() {
			this.set('categoryId', parseInt(this.get('categoryId')) || null);
			this.set('purchasedAt', new Date(this.get('purchasedAt')));
			this.set('createdAt', new Date(this.get('createdAt')));
			this.set('updatedAt', new Date(this.get('updatedAt')));

			if (!this.get('category')) {
				this.set('categoryId', null);
			}
		},
		toJson: function toJson() {
			return {
				id: this.get('id'),
				name: this.get('name'),
				price: this.get('price'),
				discount: this.get('discount'),
				purchasedAt: this.get('purchasedAt') ? this.get('purchasedAt').valueOf() : null,
				createdAt: this.get('createdAt') ? this.get('createdAt').valueOf() : null,
				updatedAt: this.get('updatedAt') ? this.get('updatedAt').valueOf() : null,
				categoryId: this.get('categoryId')
			};
		},
		_getSpecificService: function _getSpecificService() {
			return this.get('modelDaos.expense');
		}
	});
});
define('micro-expense-tracker/models/month', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Object.extend({
		startDate: null,
		endDate: null,
		year: null,
		month: null,

		displayMonth: _ember.default.computed('month', function () {
			return this.get('month') + 1;
		})
	});
});
define("micro-expense-tracker/resolver", ["exports", "ember-resolver"], function (exports, _emberResolver) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define("micro-expense-tracker/router", ["exports", "ember", "micro-expense-tracker/config/environment"], function (exports, _ember, _environment) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});


	var Router = _ember.default.Router.extend({
		location: _environment.default.locationType,
		rootURL: _environment.default.rootURL
	});

	Router.map(function () {
		this.route('categories', function () {
			this.route('new');

			this.route('edit', {
				path: 'edit/:category_id'
			});
		});
		this.route('expenses', function () {
			this.route('index');
			this.route('new');

			this.route('edit', {
				path: 'edit/:expense_id'
			});
			this.route('receipt');
		});
		this.route('summary');
		this.route('options', function () {
			this.route('language');
			this.route('misc');
			this.route('storage');
		});
		this.route('install');
	});

	exports.default = Router;
});
define('micro-expense-tracker/routes/application', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Route.extend({
		optionsService: _ember.default.inject.service(),

		beforeModel: function beforeModel() {
			if (!this.get('optionsService').getInstallationFinished()) {
				this.transitionTo('/install');
			}
		}
	});
});
define('micro-expense-tracker/routes/categories', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Route.extend({
		modelDaos: _ember.default.inject.service('dao/model-daos'),

		model: function model() {
			return this.get('modelDaos.category').getAll();
		}
	});
});
define("micro-expense-tracker/routes/categories/edit", ["exports", "ember", "rsvp"], function (exports, _ember, _rsvp) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Route.extend({
		modelDaos: _ember.default.inject.service('dao/model-daos'),
		categoryProvider: _ember.default.inject.service(),

		model: function model(params) {
			var currentCategory = this.get('modelDaos.category').getById(params.category_id);
			return _rsvp.default.hash({
				model: currentCategory,
				categories: this.get('categoryProvider').getAllSortedByPath().filter(function (category) {
					return !category.isChildOf(currentCategory);
				})
			});
		}
	});
});
define('micro-expense-tracker/routes/categories/index', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Route.extend({
		modelDaos: _ember.default.inject.service('dao/model-daos'),

		categoryChanged: _ember.default.observer('modelDaos.category.changeTimestamp', function () {
			this.refresh();
		}),

		model: function model() {
			return this.get('modelDaos.category').getAll();
		}
	});
});
define("micro-expense-tracker/routes/categories/new", ["exports", "ember", "rsvp"], function (exports, _ember, _rsvp) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Route.extend({
		categoryProvider: _ember.default.inject.service(),

		model: function model() {
			return _rsvp.default.hash({
				categories: this.get('categoryProvider').getAllSortedByPath()
			});
		}
	});
});
define("micro-expense-tracker/routes/expenses", ["exports", "ember"], function (exports, _ember) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Route.extend({});
});
define("micro-expense-tracker/routes/expenses/edit", ["exports", "ember", "rsvp"], function (exports, _ember, _rsvp) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Route.extend({
		modelDaos: _ember.default.inject.service('dao/model-daos'),
		categoryProvider: _ember.default.inject.service(),

		model: function model(params) {
			var expense = this.get('modelDaos.expense').getById(params.expense_id);
			var categories = this.get('categoryProvider').getAllSortedByPath();
			categories.unshift({});

			return _rsvp.default.hash({
				categories: categories,
				expenseOriginal: expense,
				expenseClone: expense.clone()
			});
		}
	});
});
define("micro-expense-tracker/routes/expenses/index", ["exports", "ember", "rsvp"], function (exports, _ember, _rsvp) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Route.extend({
		modelDaos: _ember.default.inject.service('dao/model-daos'),
		monthsService: _ember.default.inject.service(),

		currentMonthChanged: _ember.default.observer('monthsService.currentMonth', function () {
			this.refresh();
		}),

		expensesChanged: _ember.default.observer('modelDaos.expense.changeTimestamp', function () {
			this.refresh();
		}),

		model: function model() {
			return _rsvp.default.hash({
				categories: this.get('modelDaos.category').getAll(),
				expenses: this.get('modelDaos.expense').getByMonth(this.get('monthsService.currentMonth'))
			});
		},
		resetController: function resetController(controller, isExiting) {
			if (isExiting) {
				controller.set('filterCategoryId', null);
			}
		}
	});
});
define("micro-expense-tracker/routes/expenses/new", ["exports", "ember"], function (exports, _ember) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Route.extend({});
});
define("micro-expense-tracker/routes/expenses/receipt", ["exports", "ember", "rsvp"], function (exports, _ember, _rsvp) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Route.extend({
		modelDaos: _ember.default.inject.service('dao/model-daos'),
		categoryProvider: _ember.default.inject.service(),

		model: function model() {
			var expenseService = this.get('modelDaos.expense');
			var categories = this.get('categoryProvider').getAllSortedByPath();
			categories.unshift({});

			return _rsvp.default.hash({
				receiptDate: new Date(),
				categories: categories,
				expenses: _ember.default.A([expenseService.create(), expenseService.create()])
			});
		}
	});
});
define("micro-expense-tracker/routes/index", ["exports", "ember"], function (exports, _ember) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Route.extend({
		redirect: function redirect() {
			this.transitionTo('/install');
		}
	});
});
define('micro-expense-tracker/routes/install', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Route.extend({
		optionsService: _ember.default.inject.service(),

		beforeModel: function beforeModel() {
			if (this.get('optionsService').getInstallationFinished()) {
				this.transitionTo('/categories');
			}
		},


		actions: {
			willTransition: function willTransition(transition) {
				if (!this.get('optionsService').getInstallationFinished()) {
					transition.abort();
				}
			}
		}
	});
});
define('micro-expense-tracker/routes/options', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Route.extend({});
});
define('micro-expense-tracker/routes/options/index', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Route.extend({
		redirect: function redirect() {
			this.transitionTo('options.language');
		}
	});
});
define('micro-expense-tracker/routes/options/language', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Route.extend({
		setupController: function setupController(controller, model) {
			this._super(controller, model);
			controller.refreshData();
		}
	});
});
define('micro-expense-tracker/routes/options/misc', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Route.extend({});
});
define('micro-expense-tracker/routes/options/storage', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Route.extend({
		indexStore: _ember.default.inject.service('storage/permanent-storage-index'),

		indexChanged: _ember.default.observer("indexStore.changeTimestamp", function () {
			this.refresh();
		}),

		model: function model() {
			return this.get('indexStore').getIndexes();
		},
		setupController: function setupController(controller, model) {
			this._super(controller, model);
			controller.resetCheckboxes();
		}
	});
});
define("micro-expense-tracker/routes/summary", ["exports", "ember", "rsvp"], function (exports, _ember, _rsvp) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Route.extend({
		modelDaos: _ember.default.inject.service('dao/model-daos'),
		monthsService: _ember.default.inject.service(),

		currentMonthChanged: _ember.default.observer('monthsService.currentMonth', function () {
			this.refresh();
		}),

		model: function model() {
			return _rsvp.default.hash({
				categories: this.get('modelDaos.category').getAll(),
				expenses: this.get('modelDaos.expense').getByMonth(this.get('monthsService.currentMonth'))
			});
		}
	});
});
define('micro-expense-tracker/serializers/ls-serializer', ['exports', 'ember-localstorage-adapter/serializers/ls-serializer'], function (exports, _lsSerializer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _lsSerializer.default;
});
define('micro-expense-tracker/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define('micro-expense-tracker/services/category-provider', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Service.extend({
		modelDaos: _ember.default.inject.service('dao/model-daos'),

		getAll: function getAll() {
			return this.get('modelDaos.category').getAll();
		},
		getAllSortedByPath: function getAllSortedByPath() {
			var categories = this.getAll();

			categories.sort(function (left, right) {
				var rootNameCompare = left.get('rootName').localeCompare(right.get('rootName'));

				if (rootNameCompare === 0) {
					return left.get('namePath').localeCompare(right.get('namePath'));
				} else {
					return rootNameCompare;
				}
			});

			return categories;
		}
	});
});
define("micro-expense-tracker/services/dao/dao-category", ["exports", "ember", "micro-expense-tracker/constants/storage/key-names"], function (exports, _ember, _keyNames) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Service.extend({
		storage: _ember.default.inject.service('storage/permanent-storage-service'),

		changeTimestamp: null,
		isLoaded: false,
		data: null,

		init: function init() {
			var data = [];
			data.length = 1;

			this.set('data', data);
		},
		create: function create(properties) {
			var Category = this._getModelClass();
			var category = Category.create(properties);
			category.set('id', null);
			return category;
		},
		getById: function getById(id) {
			this._loadOptionsIfNeeded();
			return this.get('data')[id] || null;
		},
		getAll: function getAll() {
			this._loadOptionsIfNeeded();
			return this.get('data').concat().filter(function (c) {
				return c;
			});
		},
		modelSaved: function modelSaved(category) {
			var data = this.get('data');

			if (category.get('id') === null) {
				category.set('id', data.length);
				data[data.length] = category;
			}

			this.flushToStorage();
		},
		modelDeleted: function modelDeleted(category) {
			var data = this.get('data');

			delete data[category.get('id')];

			this.flushToStorage();
		},
		flushToStorage: function flushToStorage() {
			var storage = this.get('storage');
			var data = this.get('data');
			storage.setItem(this._getStorageKey(), this._toJson(data));
			this.set('changeTimestamp', Date.now());
		},
		clearMemory: function clearMemory() {
			this.set('isLoaded', false);
			this.set('data', []);
			this.set('changeTimestamp', Date.now());
		},
		_toJson: function _toJson(data) {
			var jsonData = [];
			data.forEach(function (category) {
				return jsonData.push(category.toJson());
			});
			return jsonData;
		},
		_loadOptionsIfNeeded: function _loadOptionsIfNeeded() {
			if (this.get('isLoaded')) {
				return;
			}

			var Category = this._getModelClass();
			var loadedData = this.get('storage').getItem(this._getStorageKey()) || [];
			var data = [];
			data.length = 1;

			loadedData.forEach(function (row) {
				var category = Category.create(row);
				category.afterLoad();
				data[category.get('id')] = category;
			});

			this.set('data', data);
			this.set('isLoaded', true);
			this.set('changeTimestamp', Date.now());
		},
		_getStorageKey: function _getStorageKey() {
			return _keyNames.default.categories;
		},
		_getModelClass: function _getModelClass() {
			return _ember.default.getOwner(this).lookup('model:category');
		}
	});
});
define("micro-expense-tracker/services/dao/dao-expense", ["exports", "ember", "micro-expense-tracker/constants/storage/key-names"], function (exports, _ember, _keyNames) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _slicedToArray = function () {
		function sliceIterator(arr, i) {
			var _arr = [];
			var _n = true;
			var _d = false;
			var _e = undefined;

			try {
				for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
					_arr.push(_s.value);

					if (i && _arr.length === i) break;
				}
			} catch (err) {
				_d = true;
				_e = err;
			} finally {
				try {
					if (!_n && _i["return"]) _i["return"]();
				} finally {
					if (_d) throw _e;
				}
			}

			return _arr;
		}

		return function (arr, i) {
			if (Array.isArray(arr)) {
				return arr;
			} else if (Symbol.iterator in Object(arr)) {
				return sliceIterator(arr, i);
			} else {
				throw new TypeError("Invalid attempt to destructure non-iterable instance");
			}
		};
	}();

	exports.default = _ember.default.Service.extend({
		storage: _ember.default.inject.service('storage/permanent-storage-service'),

		changeTimestamp: null,
		data: {},

		create: function create(properties) {
			var Expense = this._getModelClass();
			var expense = Expense.create(properties);
			expense.set('id', null);
			return expense;
		},
		getById: function getById(id) {
			var _getPartitionIndexes = this._getPartitionIndexes(id),
			    _getPartitionIndexes2 = _slicedToArray(_getPartitionIndexes, 3),
			    year = _getPartitionIndexes2[0],
			    month = _getPartitionIndexes2[1],
			    index = _getPartitionIndexes2[2];

			return this._getDataPartition(year, month)[index] || null;
		},
		getByMonth: function getByMonth(monthObj) {
			return this._getDataPartition(monthObj.year, monthObj.month).concat().filter(function (e) {
				return e;
			});
		},
		modelSaved: function modelSaved(expense) {
			var _getPartitionIndexes3 = this._getPartitionIndexes(expense),
			    _getPartitionIndexes4 = _slicedToArray(_getPartitionIndexes3, 2),
			    year = _getPartitionIndexes4[0],
			    month = _getPartitionIndexes4[1];

			var storageKey = this._createStorageKeyName(year, month);
			var partition = this._getDataPartition(year, month);

			if (expense.get('id') === null) {
				expense.set('id', year + "-" + month + "-" + partition.length);
				partition[partition.length] = expense;
			} else if (this._hasPartitionChanged(expense)) {
				var clone = expense.clone();
				clone.save();
				expense.delete();
				return;
			}

			this.flushToStorage(storageKey, partition);
		},
		modelDeleted: function modelDeleted(expense) {
			var _getPartitionIndexes5 = this._getPartitionIndexes(expense),
			    _getPartitionIndexes6 = _slicedToArray(_getPartitionIndexes5, 3),
			    year = _getPartitionIndexes6[0],
			    month = _getPartitionIndexes6[1],
			    index = _getPartitionIndexes6[2];

			var storageKey = this._createStorageKeyName(year, month);
			var partition = this._getDataPartition(year, month);

			delete partition[index];

			this.flushToStorage(storageKey, partition);
		},
		flushToStorage: function flushToStorage(storageKey, partition) {
			var storage = this.get('storage');
			storage.setItem(storageKey, this._toJson(partition));
			this.set('changeTimestamp', Date.now());
		},
		clearMemory: function clearMemory() {
			this.set('data', {});
			this.set('changeTimestamp', Date.now());
		},
		_toJson: function _toJson(partition) {
			var newData = [];
			partition.forEach(function (expense) {
				return newData.push(expense.toJson());
			});
			return newData;
		},
		_getDataPartition: function _getDataPartition(year, month) {
			this._loadOptionsIfNeeded(year, month);

			return this.get('data')[year][month];
		},
		_getPartitionIndexes: function _getPartitionIndexes(modelOrId) {
			if (typeof modelOrId === "string" || modelOrId instanceof String) {
				return this._getPartitionIndexesFromId(modelOrId);
			} else if (modelOrId.get('id')) {
				return this._getPartitionIndexesFromId(modelOrId.get('id'));
			} else {
				return this._getPartitionIndexesFromDate(modelOrId.get('purchasedAt'));
			}
		},
		_getPartitionIndexesFromId: function _getPartitionIndexesFromId(id) {
			var idParts = id.split("-");
			return [parseInt(idParts[0]), parseInt(idParts[1]), parseInt(idParts[2])];
		},
		_getPartitionIndexesFromDate: function _getPartitionIndexesFromDate(purchasedAt) {
			return [purchasedAt.getFullYear(), purchasedAt.getMonth()];
		},
		_hasPartitionChanged: function _hasPartitionChanged(model) {
			var _getPartitionIndexesF = this._getPartitionIndexesFromDate(model.get('purchasedAt')),
			    _getPartitionIndexesF2 = _slicedToArray(_getPartitionIndexesF, 2),
			    yearDate = _getPartitionIndexesF2[0],
			    monthDate = _getPartitionIndexesF2[1];

			var _getPartitionIndexesF3 = this._getPartitionIndexesFromId(model.get('id')),
			    _getPartitionIndexesF4 = _slicedToArray(_getPartitionIndexesF3, 2),
			    yearId = _getPartitionIndexesF4[0],
			    monthId = _getPartitionIndexesF4[1];

			return yearDate !== yearId || monthDate !== monthId;
		},
		_loadOptionsIfNeeded: function _loadOptionsIfNeeded(year, month) {
			var storedData = this.get('data');

			if (storedData.hasOwnProperty(year) && storedData[year].hasOwnProperty(month)) {
				return;
			}

			if (!storedData.hasOwnProperty(year)) {
				storedData[year] = {};
			}
			if (!storedData[year].hasOwnProperty(month)) {
				storedData[year][month] = [];
			}

			var Expense = this._getModelClass();
			var storageKey = this._createStorageKeyName(year, month);
			var loadedData = this.get('storage').getItem(storageKey) || [];
			var monthData = [];

			loadedData.forEach(function (row) {
				if (!row.id || row.id.match(/-/g).length !== 2) {
					return;
				}

				var expense = Expense.create(row);
				expense.afterLoad();
				monthData[expense.get('idIndex')] = expense;
			});

			storedData[year][month] = monthData;

			this.set('data', storedData);
			this.set('autoIncrement', monthData.length);
			this.set('changeTimestamp', Date.now());
		},
		_createStorageKeyName: function _createStorageKeyName(year, month) {
			return "" + _keyNames.default.expenses + year + "-" + month;
		},
		_getModelClass: function _getModelClass() {
			return _ember.default.getOwner(this).lookup('model:expense');
		}
	});
});
define('micro-expense-tracker/services/dao/model-daos', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Service.extend({
		category: _ember.default.inject.service('dao/dao-category'),
		expense: _ember.default.inject.service('dao/dao-expense')
	});
});
define('micro-expense-tracker/services/expense/model-saver', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Service.extend({
		utils: _ember.default.inject.service('expense/model-utils'),
		sanitizer: _ember.default.inject.service(),
		modelDaos: _ember.default.inject.service('dao/model-daos'),

		saveModels: function saveModels(models, expenseDate) {
			var _this = this;

			var promises = [];

			models.forEach(function (model) {
				if (_this.get('utils').isEmpty(model)) {
					return;
				}

				model.set('purchasedAt', expenseDate);
				model.set('createdAt', expenseDate);
				model.set('updatedAt', expenseDate);

				model.save();
			});

			return _ember.default.RSVP.Promise.all(promises);
		}
	});
});
define('micro-expense-tracker/services/expense/model-utils', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var get = _ember.default.get;
	exports.default = _ember.default.Service.extend({
		isEmpty: function isEmpty(model) {
			return !get(model, 'name') && !get(model, 'price') && !get(model, 'categoryId') && !get(model, 'discount');
		}
	});
});
define('micro-expense-tracker/services/expense/model-validator', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Service.extend({
		utils: _ember.default.inject.service('expense/model-utils'),
		sanitizer: _ember.default.inject.service(),

		validateModel: function validateModel(model) {
			var errors = [];

			if (!this.get('utils').isEmpty(model)) {
				var sanitizer = this.get('sanitizer');
				var name = model.get('name');
				var price = model.get('price');
				var discount = model.get('discount');

				if (name.length < 1) {
					errors.push('name');
				}

				if (price < 0.01 || !sanitizer.validateNumber(price)) {
					errors.push('price');
				}

				if (discount < 0 || discount > 100 || discount !== "" && discount !== null && !sanitizer.validateNumber(discount)) {
					errors.push('discount');
				}
			}

			model.set('errors', _ember.default.A(errors));

			return errors.length > 0;
		},
		validateModels: function validateModels(models) {
			var _this = this;

			var hasError = false;
			models.forEach(function (model) {
				if (!_this.get('utils').isEmpty(model)) {
					hasError = _this.validateModel(model) || hasError;
				}
			});

			return hasError;
		}
	});
});
define("micro-expense-tracker/services/global-notification-storage", ["exports", "ember"], function (exports, _ember) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});


	var MaxNotifications = 3;

	var GlobalNotification = _ember.default.Object.extend({
		id: null,
		message: "",
		"class": "",
		hiding: false
	});

	exports.default = _ember.default.Service.extend({
		idCounter: 0,
		notifications: _ember.default.A([]),

		addMessage: function addMessage(message, className, timeout) {
			var notifications = this.get('notifications');
			var id = this.get('idCounter');
			notifications.pushObject(GlobalNotification.create({
				id: id,
				message: message,
				"class": className
			}));

			this.set('idCounter', id + 1);

			if (notifications.length > MaxNotifications) {
				notifications.shiftObject();
			}

			_ember.default.run.later(this, this.removeNotification.bind(this, id), timeout);
		},
		addSuccess: function addSuccess(message, timeout) {
			this.addMessage(message, 'is-success', timeout);
		},
		addError: function addError(message, timeout) {
			this.addMessage(message, 'is-danger', timeout);
		},
		addWarning: function addWarning(message, timeout) {
			this.addMessage(message, 'is-warning', timeout);
		},
		removeNotification: function removeNotification(id) {
			var notifications = this.get('notifications');
			var notification = notifications.findBy('id', id);

			if (notification) {
				notifications.removeObject(notification);
			}
		}
	});
});
define('micro-expense-tracker/services/i18n', ['exports', 'ember-i18n/services/i18n'], function (exports, _i18n) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _i18n.default;
    }
  });
});
define('micro-expense-tracker/services/moment', ['exports', 'ember', 'micro-expense-tracker/config/environment', 'ember-moment/services/moment'], function (exports, _ember, _environment, _moment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _moment.default.extend({
    defaultFormat: _ember.default.get(_environment.default, 'moment.outputFormat')
  });
});
define("micro-expense-tracker/services/months-service", ["exports", "ember", "micro-expense-tracker/models/month"], function (exports, _ember, _month) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Service.extend({
		currentMonth: null,

		_cache: {},

		init: function init() {
			this.set('currentMonth', this.getCurrentMonthObject());
		},
		getCurrentMonthObject: function getCurrentMonthObject() {
			var now = new Date();
			return this.getMonthObject(now.getFullYear(), now.getMonth());
		},
		getMonthObject: function getMonthObject(year, month) {
			year = Math.max(1970, Math.min(2030, parseInt(year)));
			month = Math.max(0, Math.min(11, parseInt(month)));

			var id = year + "-" + month;
			var cache = this.get('_cache');

			if (!cache.hasOwnProperty(id)) {
				cache[id] = this.constructMonthObject(year, month);
			}

			return cache[id];
		},
		getMonthObjectByDelta: function getMonthObjectByDelta(monthObj, monthDelta) {
			var month = monthObj.get('month') + monthDelta;
			var year = monthObj.get('year');
			while (month < 0) {
				month += 12;
				year--;
			}
			while (month > 11) {
				month -= 12;
				year++;
			}

			return this.getMonthObject(year, month);
		},
		constructMonthObject: function constructMonthObject(year, month) {
			return _month.default.create({
				startDate: new Date(year, month, 1, 0, 0, 0, 0),
				endDate: new Date(year, month + 1, 0, 23, 59, 59, 999),
				year: year,
				month: month
			});
		}
	});
});
define("micro-expense-tracker/services/options-service", ["exports", "ember", "micro-expense-tracker/constants/options/option-names", "micro-expense-tracker/constants/storage/key-names"], function (exports, _ember, _optionNames, _keyNames) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Service.extend({
		i18n: _ember.default.inject.service(''),
		storage: _ember.default.inject.service("storage/permanent-storage-service"),

		changeTimestamp: null,
		isLoaded: false,
		options: null,

		getInstallationFinished: function getInstallationFinished() {
			return this._getOptionByName(_optionNames.default.InstallationFinished, false);
		},
		setInstallationFinished: function setInstallationFinished(value) {
			this._setOptionByName(_optionNames.default.InstallationFinished, value);
		},
		getCurrencyDisplay: function getCurrencyDisplay() {
			return this._getOptionByName(_optionNames.default.CurrencyDisplay, '$~~PRICE~~');
		},
		setCurrencyDisplay: function setCurrencyDisplay(value) {
			this._setOptionByName(_optionNames.default.CurrencyDisplay, value);
		},
		getCurrentLanguage: function getCurrentLanguage() {
			return this._getOptionByName(_optionNames.default.CurrentLanguage, 'en');
		},
		setCurrentLanguage: function setCurrentLanguage(value) {
			this._setOptionByName(_optionNames.default.CurrentLanguage, value);
		},
		flushToStorage: function flushToStorage() {
			this.get('storage').setItem(_keyNames.default.options, this.get('options'));
			this.set('changeTimestamp', Date.now());
		},
		clearMemory: function clearMemory() {
			this.set('isLoaded', false);
			this.set('options', {});
			this.set('changeTimestamp', Date.now());
		},
		_loadOptionsIfNeeded: function _loadOptionsIfNeeded() {
			if (this.get('isLoaded')) {
				return;
			}

			var options = this.get('storage').getItem(_keyNames.default.options) || {};

			this.set('options', options);
			this.set('isLoaded', true);
			this.set('changeTimestamp', Date.now());
		},
		_getOptionByName: function _getOptionByName(name, defaultValue) {
			this._loadOptionsIfNeeded();
			var options = this.get('options');

			return options.hasOwnProperty(name) ? options[name] : defaultValue;
		},
		_setOptionByName: function _setOptionByName(name, value) {
			this._loadOptionsIfNeeded();
			var options = this.get('options');

			options[name] = value;
			this.flushToStorage();
		}
	});
});
define("micro-expense-tracker/services/sanitizer", ["exports", "ember"], function (exports, _ember) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Service.extend({
		validateRegex: /^\s*?(\d|\s)*?([.,](\d|\s)+)?$/,
		validateNumber: function validateNumber(numberString) {
			if (numberString === null) {
				return false;
			}

			if (typeof numberString === 'number') {
				return true;
			}

			numberString = numberString.trim();
			return numberString !== "" && this.get('validateRegex').test(numberString);
		},
		parseNumber: function parseNumber(numberString) {
			if (!this.validateNumber(numberString)) {
				return 0;
			}

			if (typeof numberString === 'number') {
				return numberString;
			}

			numberString = numberString.trim().replace(",", ".").replace(/\s/g, '');
			return parseFloat(numberString);
		}
	});
});
define("micro-expense-tracker/services/shims/downloadjs-shim", ["exports", "ember"], function (exports, _ember) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Service.extend({
		download: function (_download) {
			function download(_x, _x2, _x3) {
				return _download.apply(this, arguments);
			}

			download.toString = function () {
				return _download.toString();
			};

			return download;
		}(function (data, fileName, mimeType) {
			download(data, fileName, mimeType);
		})
	});
});
define("micro-expense-tracker/services/storage/permanent-storage-index", ["exports", "ember", "micro-expense-tracker/constants/storage/key-names", "moment", "lodash"], function (exports, _ember, _keyNames, _moment, _lodash) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Service.extend({
		storage: _ember.default.inject.service('storage/permanent-storage-service'),

		changeTimestamp: null,
		isLoaded: false,
		data: [],

		storeIndex: function storeIndex(key) {
			this._loadOptionsIfNeeded();
			var data = this.get('data');
			if (data.indexOf(key) !== -1) {
				return;
			}

			data.push(key);
			this.flushToStorage();
		},
		getIndexes: function getIndexes() {
			this._loadOptionsIfNeeded();

			return this.get('data').concat();
		},
		removeIndex: function removeIndex(key) {
			var data = this.get('data');
			var index = data.indexOf(key);

			if (index === -1) {
				return;
			}

			data.splice(index, 1);
			this.flushToStorage();
		},
		flushToStorage: function flushToStorage() {
			var storage = this.get('storage');
			storage.setItem(this._getStorageKey(), this.get('data'));
			this.set('changeTimestamp', Date.now());
		},
		_loadOptionsIfNeeded: function _loadOptionsIfNeeded() {
			if (this.get('isLoaded')) {
				return;
			}

			var data = this.get('storage').getItem(this._getStorageKey()) || [];

			if (!data || data.length === 0) {
				data = this._rebuildIndexes();
			}

			data = _lodash.default.uniq(data);

			this.set('data', data);
			this.set('isLoaded', true);

			this.flushToStorage();
		},
		_rebuildIndexes: function _rebuildIndexes() {
			var storage = this.get('storage');
			var data = [];

			checkAndAddIndex(_keyNames.default.options);
			checkAndAddIndex(_keyNames.default.categories);
			checkAndAddIndex(_keyNames.default.dataVersion);
			checkAndAddIndex(_keyNames.default.storageIndex);

			var monthsToCheck = 36 * 2;
			var date = (0, _moment.default)().subtract(monthsToCheck / 2, "M");
			for (var i = 0; i < monthsToCheck; i++) {
				checkAndAddIndex("" + _keyNames.default.expenses + date.year() + "-" + date.month());
				date.add(1, "M");
			}

			return data;

			function checkAndAddIndex(key) {
				console.log("Checking key", key);
				if (storage.getItem(key)) {
					data.push(key);
				}
			}
		},
		_getStorageKey: function _getStorageKey() {
			return _keyNames.default.storageIndex;
		}
	});
});
define("micro-expense-tracker/services/storage/permanent-storage-local-storage", ["exports", "ember"], function (exports, _ember) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Service.extend({
		setItem: function setItem(key, value) {
			window.localStorage.setItem(key, JSON.stringify(value));
		},
		getItem: function getItem(key) {
			try {
				var result = window.localStorage.getItem(key);
				return JSON.parse(result);
			} catch (e) {
				return null;
			}
		},
		removeItem: function removeItem(key) {
			window.localStorage.removeItem(key);
		},
		forceBackup: function forceBackup() {
			// Silently ignore, local storage storage does not support backup
		}
	});
});
define('micro-expense-tracker/services/storage/permanent-storage-nw-file', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Service.extend({
		fs: null,
		savePath: null,
		isEnabled: false,

		init: function init() {
			if (window.hasOwnProperty('__nw_require')) {
				this.set('isEnabled', true);
				this.set('fs', window.__nw_require('fs'));
				this.set('savePath', window.__nw_save_path);
			}
		},
		setItem: function setItem(key, value) {
			var fs = this.get('fs');
			var path = this.getStorageFilePath(key);

			try {
				fs.unlinkSync(path);
			} catch (e) {
				// ignore, file did not exist
			}

			fs.writeFileSync(path, JSON.stringify(value));
		},
		getItem: function getItem(key) {
			var fs = this.get('fs');
			var path = this.getStorageFilePath(key);

			try {
				return JSON.parse(fs.readFileSync(path, { encoding: 'utf-8' }));
			} catch (e) {
				return null;
			}
		},
		removeItem: function removeItem(key) {
			var fs = this.get('fs');
			var path = this.getStorageFilePath(key);

			try {
				fs.unlinkSync(path);
			} catch (e) {
				// Silently ignore
			}
		},
		forceBackup: function forceBackup() {
			window.__nw_backup();
		},
		getStorageFilePath: function getStorageFilePath(key) {
			return this.get('savePath') + "/" + this._slugify(key) + "-" + this._hashString(key) + ".json";
		},
		_hashString: function _hashString(s) {
			var h = 0,
			    l = s.length,
			    i = 0;
			if (l > 0) {
				while (i < l) {
					h = (h << 5) - h + s.charCodeAt(i++) | 0;
				}
			}
			return h;
		},
		_slugify: function _slugify(s) {
			return s.replace(/[^a-z0-9_-]/ig, '-').replace(/-+/g, '-');
		}
	});
});
define('micro-expense-tracker/services/storage/permanent-storage-service', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _ember.default.Service.extend({
		dataVersion: 2,
		nwStorage: _ember.default.inject.service('storage/permanent-storage-nw-file'),
		lsStorage: _ember.default.inject.service('storage/permanent-storage-local-storage'),

		storageIndex: _ember.default.inject.service('storage/permanent-storage-index'),

		storage: _ember.default.computed(function () {
			if (this.get('nwStorage.isEnabled')) {
				return this.get('nwStorage');
			} else {
				return this.get('lsStorage');
			}
		}),

		setItem: function setItem(key, value) {
			this.get('storage').setItem(key, value);
			this.get('storageIndex').storeIndex(key);
		},
		getItem: function getItem(key) {
			return this.get('storage').getItem(key);
		},
		removeItem: function removeItem(key, doBackup) {
			if (doBackup) {
				this.get('storage').forceBackup();
			}
			this.get('storage').removeItem(key);
			this.get('storageIndex').removeIndex(key);
		}
	});
});
define('micro-expense-tracker/services/summary-service', ['exports', 'ember'], function (exports, _ember) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _slicedToArray = function () {
		function sliceIterator(arr, i) {
			var _arr = [];
			var _n = true;
			var _d = false;
			var _e = undefined;

			try {
				for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
					_arr.push(_s.value);

					if (i && _arr.length === i) break;
				}
			} catch (err) {
				_d = true;
				_e = err;
			} finally {
				try {
					if (!_n && _i["return"]) _i["return"]();
				} finally {
					if (_d) throw _e;
				}
			}

			return _arr;
		}

		return function (arr, i) {
			if (Array.isArray(arr)) {
				return arr;
			} else if (Symbol.iterator in Object(arr)) {
				return sliceIterator(arr, i);
			} else {
				throw new TypeError("Invalid attempt to destructure non-iterable instance");
			}
		};
	}();

	exports.default = _ember.default.Service.extend({
		calculateExpenseData: function calculateExpenseData(expenses, categories) {
			var expensesPerCategory = this._calculateExpenseData_initializeDataObjects(categories);

			var _calculateExpenseData = this._calculateExpenseData_sumExpenses(expenses, expensesPerCategory),
			    _calculateExpenseData2 = _slicedToArray(_calculateExpenseData, 2),
			    totalSum = _calculateExpenseData2[0],
			    uncategorizedSum = _calculateExpenseData2[1];

			this._calculateExpenseData_calculatePercentAndMapObjects(categories, totalSum, expensesPerCategory);

			return [totalSum, uncategorizedSum, _ember.default.A(Object.values(expensesPerCategory))];
		},
		_calculateExpenseData_initializeDataObjects: function _calculateExpenseData_initializeDataObjects(categories) {
			var expensesPerCategory = {};

			categories.forEach(function (category) {
				expensesPerCategory[category.get('id')] = {
					category: category,
					percentFraction: 0,
					sum: 0
				};
			});

			return expensesPerCategory;
		},
		_calculateExpenseData_sumExpenses: function _calculateExpenseData_sumExpenses(expenses, expensesPerCategoryData_out) {
			var totalSum = 0;
			var uncategorizedSum = 0;

			expenses.forEach(function (expense) {
				var category = expense.get('category');
				var isRootCategory = true;

				if (category) {
					while (category) {
						var data = expensesPerCategoryData_out[category.get('id')];
						data.sum += expense.get('realPrice');

						if (isRootCategory) {
							totalSum += expense.get('realPrice');
						}

						category = category.get('parent');
						isRootCategory = false;
					}
				} else {
					uncategorizedSum += expense.get('realPrice');
				}
			});

			return [totalSum, uncategorizedSum];
		},
		_calculateExpenseData_calculatePercentAndMapObjects: function _calculateExpenseData_calculatePercentAndMapObjects(categories, totalSum, expensesPerCategory_out) {
			if (totalSum === 0) {
				totalSum = 0.1;
			}

			categories.forEach(function (category) {
				var data = expensesPerCategory_out[category.get('id')];
				data.percentFraction = data.sum / totalSum;

				expensesPerCategory_out[category.get('id')] = _ember.default.Object.create(data);
			});
		}
	});
});
define('micro-expense-tracker/services/text-measurer', ['exports', 'ember-text-measurer/services/text-measurer'], function (exports, _textMeasurer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _textMeasurer.default;
    }
  });
});
define("micro-expense-tracker/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    var child0 = function () {
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 17,
              "column": 6
            },
            "end": {
              "line": 19,
              "column": 6
            }
          },
          "moduleName": "micro-expense-tracker/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("							");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "t", ["navigation.categories"], [], ["loc", [null, [18, 7], [18, 36]]], 0, 0]],
        locals: [],
        templates: []
      };
    }();
    var child1 = function () {
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 22,
              "column": 6
            },
            "end": {
              "line": 24,
              "column": 6
            }
          },
          "moduleName": "micro-expense-tracker/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("							");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "t", ["navigation.expenses"], [], ["loc", [null, [23, 7], [23, 34]]], 0, 0]],
        locals: [],
        templates: []
      };
    }();
    var child2 = function () {
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 27,
              "column": 6
            },
            "end": {
              "line": 29,
              "column": 6
            }
          },
          "moduleName": "micro-expense-tracker/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("							");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "t", ["navigation.summary"], [], ["loc", [null, [28, 7], [28, 33]]], 0, 0]],
        locals: [],
        templates: []
      };
    }();
    var child3 = function () {
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 32,
              "column": 6
            },
            "end": {
              "line": 34,
              "column": 6
            }
          },
          "moduleName": "micro-expense-tracker/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("							");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "t", ["navigation.options"], [], ["loc", [null, [33, 7], [33, 33]]], 0, 0]],
        locals: [],
        templates: []
      };
    }();
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 74,
            "column": 6
          }
        },
        "moduleName": "micro-expense-tracker/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "met-application");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("header");
        dom.setAttribute(el2, "class", "section-header");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "container");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "title-boxes");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("h1");
        dom.setAttribute(el5, "class", "title");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("img");
        dom.setAttribute(el6, "class", "logo");
        dom.setAttribute(el6, "src", "/assets/logo_white.svg");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("h4");
        dom.setAttribute(el5, "class", "subtitle");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("nav");
        dom.setAttribute(el4, "class", "nav");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("nav");
        dom.setAttribute(el5, "class", "nav-left");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("strong");
        dom.setAttribute(el6, "class", "nav-item app-title");
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("img");
        dom.setAttribute(el7, "class", "logo");
        dom.setAttribute(el7, "src", "/assets/logo_white.svg");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6, "class", "nav-item");
        var el7 = dom.createTextNode("\n");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6, "class", "nav-item");
        var el7 = dom.createTextNode("\n");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6, "class", "nav-item");
        var el7 = dom.createTextNode("\n");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6, "class", "nav-item");
        var el7 = dom.createTextNode("\n");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("nav");
        dom.setAttribute(el5, "class", "nav-right");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "nav-item");
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "route-content");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("footer");
        dom.setAttribute(el2, "class", "section-footer");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "container");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "columns");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "column");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("h4");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("p");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "column");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("h4");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("p");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "column");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("h4");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("p");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("ul");
        dom.setAttribute(el4, "class", "credits");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1, 1]);
        var element2 = dom.childAt(element1, [1]);
        var element3 = dom.childAt(element1, [3]);
        var element4 = dom.childAt(element3, [1]);
        var element5 = dom.childAt(element0, [7, 1]);
        var element6 = dom.childAt(element5, [1]);
        var element7 = dom.childAt(element6, [1]);
        var element8 = dom.childAt(element6, [3]);
        var element9 = dom.childAt(element6, [5]);
        var element10 = dom.childAt(element5, [3]);
        var morphs = new Array(17);
        morphs[0] = dom.createMorphAt(dom.childAt(element2, [1]), 3, 3);
        morphs[1] = dom.createMorphAt(dom.childAt(element2, [3]), 0, 0);
        morphs[2] = dom.createMorphAt(dom.childAt(element4, [3]), 1, 1);
        morphs[3] = dom.createMorphAt(dom.childAt(element4, [5]), 1, 1);
        morphs[4] = dom.createMorphAt(dom.childAt(element4, [7]), 1, 1);
        morphs[5] = dom.createMorphAt(dom.childAt(element4, [9]), 1, 1);
        morphs[6] = dom.createMorphAt(dom.childAt(element3, [3, 1]), 1, 1);
        morphs[7] = dom.createMorphAt(element0, 3, 3);
        morphs[8] = dom.createMorphAt(dom.childAt(element0, [5]), 1, 1);
        morphs[9] = dom.createUnsafeMorphAt(dom.childAt(element7, [1]), 0, 0);
        morphs[10] = dom.createUnsafeMorphAt(dom.childAt(element7, [3]), 0, 0);
        morphs[11] = dom.createUnsafeMorphAt(dom.childAt(element8, [1]), 0, 0);
        morphs[12] = dom.createUnsafeMorphAt(dom.childAt(element8, [3]), 0, 0);
        morphs[13] = dom.createUnsafeMorphAt(dom.childAt(element9, [1]), 0, 0);
        morphs[14] = dom.createUnsafeMorphAt(dom.childAt(element9, [3]), 0, 0);
        morphs[15] = dom.createUnsafeMorphAt(dom.childAt(element10, [1]), 0, 0);
        morphs[16] = dom.createUnsafeMorphAt(dom.childAt(element10, [3]), 0, 0);
        return morphs;
      },
      statements: [["inline", "t", ["app.title"], [], ["loc", [null, [7, 5], [7, 22]]], 0, 0], ["inline", "t", ["app.subtitle"], [], ["loc", [null, [9, 25], [9, 45]]], 0, 0], ["block", "link-to", ["categories"], [], 0, null, ["loc", [null, [17, 6], [19, 18]]]], ["block", "link-to", ["expenses"], [], 1, null, ["loc", [null, [22, 6], [24, 18]]]], ["block", "link-to", ["summary"], [], 2, null, ["loc", [null, [27, 6], [29, 18]]]], ["block", "link-to", ["options"], [], 3, null, ["loc", [null, [32, 6], [34, 18]]]], ["inline", "date-switcher", [], ["action", ["subexpr", "action", ["currentMonthChanged"], [], ["loc", [null, [40, 29], [40, 59]]], 0, 0], "currentMonth", ["subexpr", "@mut", [["get", "currentMonth", ["loc", [null, [40, 73], [40, 85]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [40, 6], [40, 87]]], 0, 0], ["content", "global-notifications", ["loc", [null, [47, 1], [47, 25]]], 0, 0, 0, 0], ["content", "outlet", ["loc", [null, [49, 2], [49, 12]]], 0, 0, 0, 0], ["inline", "t", ["footer.header_1"], [], ["loc", [null, [56, 9], [56, 34]]], 0, 0], ["inline", "t", ["footer.body_1"], [], ["loc", [null, [57, 8], [57, 31]]], 0, 0], ["inline", "t", ["footer.header_2"], [], ["loc", [null, [60, 9], [60, 34]]], 0, 0], ["inline", "t", ["footer.body_2"], [], ["loc", [null, [61, 8], [61, 31]]], 0, 0], ["inline", "t", ["footer.header_3"], [], ["loc", [null, [64, 9], [64, 34]]], 0, 0], ["inline", "t", ["footer.body_3"], [], ["loc", [null, [65, 8], [65, 31]]], 0, 0], ["inline", "t", ["footer.made_by"], [], ["loc", [null, [69, 8], [69, 32]]], 0, 0], ["inline", "t", ["footer.thanks"], [], ["loc", [null, [70, 8], [70, 31]]], 0, 0]],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  }());
});
define("micro-expense-tracker/templates/categories", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 10
          }
        },
        "moduleName": "micro-expense-tracker/templates/categories.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  }());
});
define("micro-expense-tracker/templates/categories/edit", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 0
          }
        },
        "moduleName": "micro-expense-tracker/templates/categories/edit.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("article");
        dom.setAttribute(el1, "class", "categories-edit-route");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h1");
        dom.setAttribute(el2, "class", "title");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 0, 0);
        morphs[1] = dom.createMorphAt(element0, 3, 3);
        return morphs;
      },
      statements: [["inline", "t", ["section.categories.edit.title"], ["title", ["subexpr", "@mut", [["get", "model.model.namePath", ["loc", [null, [2, 61], [2, 81]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [2, 19], [2, 83]]], 0, 0], ["inline", "category-editor", [], ["categories", ["subexpr", "@mut", [["get", "model.categories", ["loc", [null, [3, 30], [3, 46]]], 0, 0, 0, 0]], [], [], 0, 0], "onSave", ["subexpr", "action", ["onSave"], [], ["loc", [null, [3, 54], [3, 71]]], 0, 0], "onCancel", ["subexpr", "action", ["onCancel"], [], ["loc", [null, [3, 81], [3, 100]]], 0, 0], "model", ["subexpr", "@mut", [["get", "formModel", ["loc", [null, [3, 107], [3, 116]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [3, 1], [3, 118]]], 0, 0]],
      locals: [],
      templates: []
    };
  }());
});
define("micro-expense-tracker/templates/categories/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    var child0 = function () {
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 12,
              "column": 4
            },
            "end": {
              "line": 12,
              "column": 128
            }
          },
          "moduleName": "micro-expense-tracker/templates/categories/index.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["inline", "t", ["section.categories.index.add_new_category"], [], ["loc", [null, [12, 79], [12, 128]]], 0, 0]],
        locals: [],
        templates: []
      };
    }();
    var child1 = function () {
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 38,
              "column": 3
            },
            "end": {
              "line": 40,
              "column": 3
            }
          },
          "moduleName": "micro-expense-tracker/templates/categories/index.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("				");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "categories/category-index-row", [], ["row", ["subexpr", "@mut", [["get", "row", ["loc", [null, [39, 40], [39, 43]]], 0, 0, 0, 0]], [], [], 0, 0], "onDeleteCategory", ["subexpr", "action", ["deleteCategory"], [], ["loc", [null, [39, 61], [39, 86]]], 0, 0]], ["loc", [null, [39, 4], [39, 88]]], 0, 0]],
        locals: ["row"],
        templates: []
      };
    }();
    var child2 = function () {
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 40,
              "column": 3
            },
            "end": {
              "line": 46,
              "column": 3
            }
          },
          "moduleName": "micro-expense-tracker/templates/categories/index.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("				");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("tr");
          dom.setAttribute(el1, "class", "no-data");
          var el2 = dom.createTextNode("\n					");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          dom.setAttribute(el2, "colspan", "2");
          var el3 = dom.createTextNode("\n						");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n					");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n				");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createUnsafeMorphAt(dom.childAt(fragment, [1, 1]), 1, 1);
          return morphs;
        },
        statements: [["inline", "t", ["section.categories.index.empty_row"], ["button", ["subexpr", "t", ["section.categories.index.add_new_category"], [], ["loc", [null, [43, 55], [43, 102]]], 0, 0]], ["loc", [null, [43, 6], [43, 105]]], 0, 0]],
        locals: [],
        templates: []
      };
    }();
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 50,
            "column": 10
          }
        },
        "moduleName": "micro-expense-tracker/templates/categories/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("article");
        dom.setAttribute(el1, "class", "categories-index-route");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h1");
        dom.setAttribute(el2, "class", "container title");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("nav");
        dom.setAttribute(el2, "class", "level");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "level-left");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "level-item");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        dom.setAttribute(el5, "class", "subtitle is-5");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode(":\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "level-item");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "level-right");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "level-item");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        dom.setAttribute(el5, "class", "subtitle is-5");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode(":\n\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("strong");
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("article");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("table");
        dom.setAttribute(el3, "class", "table data-table");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("thead");
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("tr");
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("th");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("th");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n			");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tbody");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [3]);
        var element2 = dom.childAt(element1, [1]);
        var element3 = dom.childAt(element1, [3, 1, 1]);
        var element4 = dom.childAt(element0, [5, 1]);
        var element5 = dom.childAt(element4, [1, 1]);
        var morphs = new Array(8);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 0, 0);
        morphs[1] = dom.createMorphAt(dom.childAt(element2, [1, 1]), 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(element2, [3]), 1, 1);
        morphs[3] = dom.createMorphAt(element3, 1, 1);
        morphs[4] = dom.createMorphAt(dom.childAt(element3, [3]), 1, 1);
        morphs[5] = dom.createMorphAt(dom.childAt(element5, [1]), 0, 0);
        morphs[6] = dom.createMorphAt(dom.childAt(element5, [3]), 0, 0);
        morphs[7] = dom.createMorphAt(dom.childAt(element4, [3]), 1, 1);
        return morphs;
      },
      statements: [["inline", "t", ["section.categories.title"], [], ["loc", [null, [2, 29], [2, 61]]], 0, 0], ["inline", "t", ["section.categories.index.actions"], [], ["loc", [null, [8, 5], [8, 45]]], 0, 0], ["block", "link-to", ["categories.new"], ["class", "button is-primary action-new-category"], 0, null, ["loc", [null, [12, 4], [12, 140]]]], ["inline", "t", ["section.categories.index.categories"], [], ["loc", [null, [19, 5], [19, 48]]], 0, 0], ["content", "sortedCategories.length", ["loc", [null, [22, 6], [22, 33]]], 0, 0, 0, 0], ["inline", "t", ["section.categories.index.name_path"], [], ["loc", [null, [33, 8], [33, 50]]], 0, 0], ["inline", "t", ["section.categories.index.actions"], [], ["loc", [null, [34, 8], [34, 48]]], 0, 0], ["block", "each", [["get", "sortedCategories", ["loc", [null, [38, 11], [38, 27]]], 0, 0, 0, 0]], [], 1, 2, ["loc", [null, [38, 3], [46, 12]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  }());
});
define("micro-expense-tracker/templates/categories/new", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 10
          }
        },
        "moduleName": "micro-expense-tracker/templates/categories/new.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("article");
        dom.setAttribute(el1, "class", "categories-new-route");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h1");
        dom.setAttribute(el2, "class", "title");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 0, 0);
        morphs[1] = dom.createMorphAt(element0, 3, 3);
        return morphs;
      },
      statements: [["inline", "t", ["section.categories.new.title"], [], ["loc", [null, [2, 19], [2, 55]]], 0, 0], ["inline", "category-editor", [], ["categories", ["subexpr", "@mut", [["get", "model.categories", ["loc", [null, [3, 30], [3, 46]]], 0, 0, 0, 0]], [], [], 0, 0], "onSave", ["subexpr", "action", ["onSave"], [], ["loc", [null, [3, 54], [3, 71]]], 0, 0], "onCancel", ["subexpr", "action", ["onCancel"], [], ["loc", [null, [3, 81], [3, 100]]], 0, 0]], ["loc", [null, [3, 1], [3, 102]]], 0, 0]],
      locals: [],
      templates: []
    };
  }());
});
define("micro-expense-tracker/templates/components/categories/category-index-row", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    var child0 = function () {
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 3
            },
            "end": {
              "line": 9,
              "column": 3
            }
          },
          "moduleName": "micro-expense-tracker/templates/components/categories/category-index-row.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("				");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("i");
          dom.setAttribute(el1, "class", "fa fa-edit");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    }();
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 17,
            "column": 5
          }
        },
        "moduleName": "micro-expense-tracker/templates/components/categories/category-index-row.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("tr");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("td");
        dom.setAttribute(el2, "class", "category-name");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("td");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("span");
        dom.setAttribute(el3, "class", "icon");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("span");
        dom.setAttribute(el3, "class", "icon");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "href", "#");
        dom.setAttribute(el4, "class", "action-remove");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("i");
        dom.setAttribute(el5, "class", "fa fa-remove");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [3]);
        var element2 = dom.childAt(element1, [3, 1]);
        var morphs = new Array(6);
        morphs[0] = dom.createAttrMorph(element0, 'class');
        morphs[1] = dom.createAttrMorph(element0, 'data-id');
        morphs[2] = dom.createUnsafeMorphAt(dom.childAt(element0, [1]), 1, 1);
        morphs[3] = dom.createMorphAt(dom.childAt(element1, [1]), 1, 1);
        morphs[4] = dom.createAttrMorph(element2, 'title');
        morphs[5] = dom.createElementMorph(element2);
        return morphs;
      },
      statements: [["attribute", "class", ["concat", ["category-row category-row-", ["get", "row.id", ["loc", [null, [1, 39], [1, 45]]], 0, 0, 0, 0]], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "data-id", ["get", "row.id", ["loc", [null, [1, 59], [1, 65]]], 0, 0, 0, 0], 0, 0, 0, 0], ["content", "row.namePathForHtml", ["loc", [null, [3, 2], [3, 27]]], 0, 0, 0, 0], ["block", "link-to", ["categories.edit", ["get", "row.id", ["loc", [null, [7, 32], [7, 38]]], 0, 0, 0, 0]], ["class", "action-edit", "title", ["subexpr", "t", ["section.categories.index.action.edit"], ["category", ["get", "row.namePath", ["loc", [null, [7, 116], [7, 128]]], 0, 0, 0, 0]], ["loc", [null, [7, 65], [7, 129]]], 0, 0]], 0, null, ["loc", [null, [7, 3], [9, 15]]]], ["attribute", "title", ["subexpr", "t", ["section.categories.index.action.delete"], ["category", ["get", "row.namePath", ["loc", [null, [12, 132], [12, 144]]], 0, 0, 0, 0]], ["loc", [null, [null, null], [12, 146]]], 0, 0], 0, 0, 0, 0], ["element", "action", ["deleteCategory", ["get", "row.id", ["loc", [null, [12, 41], [12, 47]]], 0, 0, 0, 0]], [], ["loc", [null, [12, 15], [12, 49]]], 0, 0]],
      locals: [],
      templates: [child0]
    };
  }());
});
define("micro-expense-tracker/templates/components/category-editor", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 30,
            "column": 6
          }
        },
        "moduleName": "micro-expense-tracker/templates/components/category-editor.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "columns");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "column is-12 is-6-tablet is-4-desktop");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("form");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("input");
        dom.setAttribute(el4, "class", "category-id");
        dom.setAttribute(el4, "type", "hidden");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "field");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        dom.setAttribute(el5, "class", "control");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6, "for", "category-name-input");
        dom.setAttribute(el6, "class", "label");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("*");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("input");
        dom.setAttribute(el6, "id", "category-name-input");
        dom.setAttribute(el6, "class", "name-input input");
        dom.setAttribute(el6, "required", "");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "field");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        dom.setAttribute(el5, "class", "control");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6, "class", "label");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "field");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        dom.setAttribute(el5, "class", "control");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("button");
        dom.setAttribute(el6, "class", "action-save button is-success");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("button");
        dom.setAttribute(el6, "class", "action-cancel button is-outlined");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1, 1]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element0, [3, 1]);
        var element3 = dom.childAt(element2, [3]);
        var element4 = dom.childAt(element0, [5, 1]);
        var element5 = dom.childAt(element0, [7, 1]);
        var element6 = dom.childAt(element5, [3]);
        var morphs = new Array(9);
        morphs[0] = dom.createAttrMorph(element0, 'onsubmit');
        morphs[1] = dom.createAttrMorph(element1, 'value');
        morphs[2] = dom.createMorphAt(dom.childAt(element2, [1]), 0, 0);
        morphs[3] = dom.createAttrMorph(element3, 'value');
        morphs[4] = dom.createMorphAt(dom.childAt(element4, [1]), 0, 0);
        morphs[5] = dom.createMorphAt(element4, 3, 3);
        morphs[6] = dom.createMorphAt(dom.childAt(element5, [1]), 0, 0);
        morphs[7] = dom.createAttrMorph(element6, 'onclick');
        morphs[8] = dom.createMorphAt(element6, 0, 0);
        return morphs;
      },
      statements: [["attribute", "onsubmit", ["subexpr", "action", ["saveHandler"], [], ["loc", [null, [null, null], [3, 41]]], 0, 0], 0, 0, 0, 0], ["attribute", "value", ["get", "model.id", ["loc", [null, [4, 52], [4, 60]]], 0, 0, 0, 0], 0, 0, 0, 0], ["inline", "t", ["section.categories.form.name"], [], ["loc", [null, [8, 52], [8, 88]]], 0, 0], ["attribute", "value", ["get", "model.name", ["loc", [null, [9, 79], [9, 89]]], 0, 0, 0, 0], 0, 0, 0, 0], ["inline", "t", ["section.categories.form.parent"], [], ["loc", [null, [14, 26], [14, 64]]], 0, 0], ["inline", "select-input", [], ["class", "parent-id-input select is-fullwidth", "options", ["subexpr", "@mut", [["get", "categoriesData", ["loc", [null, [17, 28], [17, 42]]], 0, 0, 0, 0]], [], [], 0, 0], "selectedValue", ["subexpr", "@mut", [["get", "model.parentId", ["loc", [null, [18, 34], [18, 48]]], 0, 0, 0, 0]], [], [], 0, 0], "firstOption", ["subexpr", "t", ["section.categories.form.parent_none"], [], ["loc", [null, [19, 32], [19, 73]]], 0, 0]], ["loc", [null, [16, 5], [19, 75]]], 0, 0], ["inline", "t", ["section.categories.form.save"], [], ["loc", [null, [24, 51], [24, 87]]], 0, 0], ["attribute", "onclick", ["subexpr", "action", ["cancelHandler"], [], ["loc", [null, [null, null], [25, 88]]], 0, 0], 0, 0, 0, 0], ["inline", "t", ["section.categories.form.cancel"], [], ["loc", [null, [25, 89], [25, 127]]], 0, 0]],
      locals: [],
      templates: []
    };
  }());
});
define("micro-expense-tracker/templates/components/common/button-bar", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    var child0 = function () {
      var child0 = function () {
        return {
          meta: {
            "revision": "Ember@2.9.1",
            "loc": {
              "source": null,
              "start": {
                "line": 6,
                "column": 5
              },
              "end": {
                "line": 8,
                "column": 5
              }
            },
            "moduleName": "micro-expense-tracker/templates/components/common/button-bar.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("						");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            dom.setAttribute(el1, "class", "icon is-small");
            var el2 = dom.createElement("i");
            dom.setAttribute(el2, "class", "fa fa-image");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      }();
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 2
            },
            "end": {
              "line": 12,
              "column": 2
            }
          },
          "moduleName": "micro-expense-tracker/templates/components/common/button-bar.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("			");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createTextNode("\n				");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("					");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n				");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n			");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [1]);
          var morphs = new Array(4);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          morphs[1] = dom.createElementMorph(element0);
          morphs[2] = dom.createMorphAt(element1, 1, 1);
          morphs[3] = dom.createMorphAt(dom.childAt(element1, [3]), 0, 0);
          return morphs;
        },
        statements: [["attribute", "class", ["concat", ["item-", ["subexpr", "slugify", [["get", "option.value", ["loc", [null, [4, 29], [4, 41]]], 0, 0, 0, 0]], [], ["loc", [null, [4, 19], [4, 43]]], 0, 0], " ", ["subexpr", "if", [["subexpr", "eq", [["get", "option.value", ["loc", [null, [4, 53], [4, 65]]], 0, 0, 0, 0], ["get", "value", ["loc", [null, [4, 66], [4, 71]]], 0, 0, 0, 0]], [], ["loc", [null, [4, 49], [4, 72]]], 0, 0], "is-active", ""], [], ["loc", [null, [4, 44], [4, 89]]], 0, 0]], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["element", "action", ["handleClicked", ["get", "option.value", ["loc", [null, [4, 116], [4, 128]]], 0, 0, 0, 0]], [], ["loc", [null, [4, 91], [4, 130]]], 0, 0], ["block", "if", [["get", "option.icon", ["loc", [null, [6, 11], [6, 22]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [6, 5], [8, 12]]]], ["content", "option.display", ["loc", [null, [9, 11], [9, 29]]], 0, 0, 0, 0]],
        locals: ["option"],
        templates: [child0]
      };
    }();
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 14,
            "column": 6
          }
        },
        "moduleName": "micro-expense-tracker/templates/components/common/button-bar.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "tabs is-toggle");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 1]), 1, 1);
        return morphs;
      },
      statements: [["block", "each", [["get", "options", ["loc", [null, [3, 10], [3, 17]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [3, 2], [12, 11]]]]],
      locals: [],
      templates: [child0]
    };
  }());
});
define("micro-expense-tracker/templates/components/common/danger-button", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 4
          }
        },
        "moduleName": "micro-expense-tracker/templates/components/common/danger-button.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("a");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(3);
        morphs[0] = dom.createAttrMorph(element0, 'class');
        morphs[1] = dom.createAttrMorph(element0, 'onclick');
        morphs[2] = dom.createMorphAt(element0, 1, 1);
        return morphs;
      },
      statements: [["attribute", "class", ["concat", ["button ", ["subexpr", "if", [["get", "isTriggered", ["loc", [null, [1, 22], [1, 33]]], 0, 0, 0, 0], "is-danger", "is-warning"], [], ["loc", [null, [1, 17], [1, 60]]], 0, 0]], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "onclick", ["subexpr", "action", ["trigger"], [], ["loc", [null, [null, null], [1, 90]]], 0, 0], 0, 0, 0, 0], ["content", "yield", ["loc", [null, [2, 1], [2, 10]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  }());
});
define("micro-expense-tracker/templates/components/date-switcher", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 6
          }
        },
        "moduleName": "micro-expense-tracker/templates/components/date-switcher.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "date-switcher");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        var el3 = dom.createTextNode("<");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2, "class", "current-month");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("-");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        var el3 = dom.createTextNode(">");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element0, [3]);
        var element3 = dom.childAt(element0, [5]);
        var morphs = new Array(6);
        morphs[0] = dom.createElementMorph(element1);
        morphs[1] = dom.createAttrMorph(element2, 'title');
        morphs[2] = dom.createElementMorph(element2);
        morphs[3] = dom.createMorphAt(element2, 1, 1);
        morphs[4] = dom.createMorphAt(element2, 3, 3);
        morphs[5] = dom.createElementMorph(element3);
        return morphs;
      },
      statements: [["element", "action", ["switchMonth", -1], [], ["loc", [null, [2, 4], [2, 31]]], 0, 0], ["attribute", "title", ["subexpr", "t", ["components.date_switcher.return"], [], ["loc", [null, [null, null], [3, 95]]], 0, 0], 0, 0, 0, 0], ["element", "action", ["resetMonth"], [], ["loc", [null, [3, 26], [3, 49]]], 0, 0], ["content", "currentMonth.year", ["loc", [null, [4, 2], [4, 23]]], 0, 0, 0, 0], ["inline", "pad-start", [["get", "currentMonth.displayMonth", ["loc", [null, [4, 36], [4, 61]]], 0, 0, 0, 0], 2, "0"], [], ["loc", [null, [4, 24], [4, 69]]], 0, 0], ["element", "action", ["switchMonth", 1], [], ["loc", [null, [6, 4], [6, 30]]], 0, 0]],
      locals: [],
      templates: []
    };
  }());
});
define("micro-expense-tracker/templates/components/expenses-editor", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    var child0 = function () {
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 2
            },
            "end": {
              "line": 5,
              "column": 2
            }
          },
          "moduleName": "micro-expense-tracker/templates/components/expenses-editor.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("			");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("label");
          dom.setAttribute(el1, "class", "label");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          return morphs;
        },
        statements: [["inline", "t", ["section.expenses.edit_expense_component.name"], [], ["loc", [null, [4, 24], [4, 76]]], 0, 0]],
        locals: [],
        templates: []
      };
    }();
    var child1 = function () {
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 14,
              "column": 2
            },
            "end": {
              "line": 16,
              "column": 2
            }
          },
          "moduleName": "micro-expense-tracker/templates/components/expenses-editor.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("			");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("label");
          dom.setAttribute(el1, "class", "label");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          return morphs;
        },
        statements: [["inline", "t", ["section.expenses.edit_expense_component.price"], [], ["loc", [null, [15, 24], [15, 77]]], 0, 0]],
        locals: [],
        templates: []
      };
    }();
    var child2 = function () {
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 25,
              "column": 2
            },
            "end": {
              "line": 27,
              "column": 2
            }
          },
          "moduleName": "micro-expense-tracker/templates/components/expenses-editor.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("			");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("label");
          dom.setAttribute(el1, "class", "label");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          return morphs;
        },
        statements: [["inline", "t", ["section.expenses.edit_expense_component.category"], [], ["loc", [null, [26, 24], [26, 80]]], 0, 0]],
        locals: [],
        templates: []
      };
    }();
    var child3 = function () {
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 29,
              "column": 3
            },
            "end": {
              "line": 39,
              "column": 3
            }
          },
          "moduleName": "micro-expense-tracker/templates/components/expenses-editor.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("				");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createUnsafeMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "model.namePathForHtml", ["loc", [null, [38, 4], [38, 31]]], 0, 0, 0, 0]],
        locals: ["model"],
        templates: []
      };
    }();
    var child4 = function () {
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 43,
              "column": 2
            },
            "end": {
              "line": 45,
              "column": 2
            }
          },
          "moduleName": "micro-expense-tracker/templates/components/expenses-editor.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("			");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("label");
          dom.setAttribute(el1, "class", "label");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          return morphs;
        },
        statements: [["inline", "t", ["section.expenses.edit_expense_component.discount"], [], ["loc", [null, [44, 24], [44, 80]]], 0, 0]],
        locals: [],
        templates: []
      };
    }();
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 63,
            "column": 0
          }
        },
        "moduleName": "micro-expense-tracker/templates/components/expenses-editor.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "field");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        dom.setAttribute(el3, "class", "control");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("input");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "field");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        dom.setAttribute(el3, "class", "control has-icon has-icon-right");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("input");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "field");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        dom.setAttribute(el3, "class", "control");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "field");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        dom.setAttribute(el3, "class", "control has-icons-right");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("input");
        dom.setAttribute(el4, "type", "number");
        dom.setAttribute(el4, "max", "100");
        dom.setAttribute(el4, "min", "0");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4, "class", "icon is-small is-right");
        var el5 = dom.createTextNode("\n      		");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("i");
        dom.setAttribute(el5, "class", "fa fa-percent");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [3, 1]);
        var element3 = dom.childAt(element0, [3]);
        var element4 = dom.childAt(element3, [3, 1]);
        var element5 = dom.childAt(element0, [5]);
        var element6 = dom.childAt(element5, [3]);
        var element7 = dom.childAt(element0, [7]);
        var element8 = dom.childAt(element7, [3, 1]);
        var morphs = new Array(21);
        morphs[0] = dom.createAttrMorph(element0, 'class');
        morphs[1] = dom.createMorphAt(element1, 1, 1);
        morphs[2] = dom.createAttrMorph(element2, 'class');
        morphs[3] = dom.createAttrMorph(element2, 'placeholder');
        morphs[4] = dom.createAttrMorph(element2, 'value');
        morphs[5] = dom.createAttrMorph(element2, 'oninput');
        morphs[6] = dom.createMorphAt(element3, 1, 1);
        morphs[7] = dom.createAttrMorph(element4, 'class');
        morphs[8] = dom.createAttrMorph(element4, 'placeholder');
        morphs[9] = dom.createAttrMorph(element4, 'value');
        morphs[10] = dom.createAttrMorph(element4, 'oninput');
        morphs[11] = dom.createMorphAt(element5, 1, 1);
        morphs[12] = dom.createAttrMorph(element6, 'style');
        morphs[13] = dom.createMorphAt(element6, 1, 1);
        morphs[14] = dom.createMorphAt(element7, 1, 1);
        morphs[15] = dom.createAttrMorph(element8, 'class');
        morphs[16] = dom.createAttrMorph(element8, 'placeholder');
        morphs[17] = dom.createAttrMorph(element8, 'value');
        morphs[18] = dom.createAttrMorph(element8, 'onchange');
        morphs[19] = dom.createAttrMorph(element8, 'oninput');
        morphs[20] = dom.createAttrMorph(element8, 'onblur');
        return morphs;
      },
      statements: [["attribute", "class", ["concat", ["expense-row field ", ["subexpr", "if", [["get", "horizontal", ["loc", [null, [1, 35], [1, 45]]], 0, 0, 0, 0], "is-grouped"], [], ["loc", [null, [1, 30], [1, 60]]], 0, 0]], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["block", "if", [["get", "vertical", ["loc", [null, [3, 8], [3, 16]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [3, 2], [5, 9]]]], ["attribute", "class", ["concat", ["input expense-name ", ["get", "nameErrorClass", ["loc", [null, [7, 38], [7, 52]]], 0, 0, 0, 0]], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "placeholder", ["subexpr", "t", ["section.expenses.edit_expense_component.name_placeholder"], [], ["loc", [null, [null, null], [8, 86]]], 0, 0], 0, 0, 0, 0], ["attribute", "value", ["get", "model.name", ["loc", [null, [9, 19], [9, 29]]], 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "oninput", ["subexpr", "action", ["onChangeName"], [], ["loc", [null, [null, null], [10, 43]]], 0, 0], 0, 0, 0, 0], ["block", "if", [["get", "vertical", ["loc", [null, [14, 8], [14, 16]]], 0, 0, 0, 0]], [], 1, null, ["loc", [null, [14, 2], [16, 9]]]], ["attribute", "class", ["concat", ["input expense-price ", ["get", "priceErrorClass", ["loc", [null, [18, 39], [18, 54]]], 0, 0, 0, 0]], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "placeholder", ["subexpr", "t", ["section.expenses.edit_expense_component.price_placeholder"], [], ["loc", [null, [null, null], [19, 87]]], 0, 0], 0, 0, 0, 0], ["attribute", "value", ["get", "model.price", ["loc", [null, [20, 19], [20, 30]]], 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "oninput", ["subexpr", "action", ["onChangePrice"], [], ["loc", [null, [null, null], [21, 44]]], 0, 0], 0, 0, 0, 0], ["block", "if", [["get", "vertical", ["loc", [null, [25, 8], [25, 16]]], 0, 0, 0, 0]], [], 2, null, ["loc", [null, [25, 2], [27, 9]]]], ["attribute", "style", ["subexpr", "if", [["get", "horizontal", ["loc", [null, [28, 32], [28, 42]]], 0, 0, 0, 0], "width: 400px"], [], ["loc", [null, [null, null], [28, 59]]], 0, 0], 0, 0, 0, 0], ["block", "power-select", [], ["triggerClass", "input", "selected", ["subexpr", "@mut", [["get", "model.category", ["loc", [null, [30, 28], [30, 42]]], 0, 0, 0, 0]], [], [], 0, 0], "options", ["subexpr", "@mut", [["get", "options", ["loc", [null, [31, 27], [31, 34]]], 0, 0, 0, 0]], [], [], 0, 0], "searchField", "namePathForHtml", "onchange", ["subexpr", "action", ["changedCategory"], [], ["loc", [null, [33, 28], [33, 54]]], 0, 0], "onfocus", ["subexpr", "action", ["handleFocus"], [], ["loc", [null, [34, 27], [34, 49]]], 0, 0], "onkeydown", ["subexpr", "action", ["handleCategoryInput"], [], ["loc", [null, [35, 29], [35, 59]]], 0, 0], "placeholder", ["subexpr", "t", ["section.expenses.edit_expense_component.category_placeholder"], [], ["loc", [null, [36, 31], [36, 97]]], 0, 0]], 3, null, ["loc", [null, [29, 3], [39, 20]]]], ["block", "if", [["get", "vertical", ["loc", [null, [43, 8], [43, 16]]], 0, 0, 0, 0]], [], 4, null, ["loc", [null, [43, 2], [45, 9]]]], ["attribute", "class", ["concat", ["input expense-discount ", ["get", "discountErrorClass", ["loc", [null, [47, 42], [47, 60]]], 0, 0, 0, 0]], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "placeholder", ["subexpr", "t", ["section.expenses.edit_expense_component.discount_placeholder"], [], ["loc", [null, [null, null], [51, 90]]], 0, 0], 0, 0, 0, 0], ["attribute", "value", ["get", "model.discountPercent", ["loc", [null, [52, 19], [52, 40]]], 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "onchange", ["subexpr", "action", ["onChangeDiscount"], [], ["loc", [null, [null, null], [53, 48]]], 0, 0], 0, 0, 0, 0], ["attribute", "oninput", ["subexpr", "action", ["onChangeDiscount"], [], ["loc", [null, [null, null], [54, 48]]], 0, 0], 0, 0, 0, 0], ["attribute", "onblur", ["subexpr", "action", ["onChangeDiscount"], [], ["loc", [null, [null, null], [55, 46]]], 0, 0], 0, 0, 0, 0]],
      locals: [],
      templates: [child0, child1, child2, child3, child4]
    };
  }());
});
define("micro-expense-tracker/templates/components/global-notifications", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    var child0 = function () {
      var child0 = function () {
        return {
          meta: {
            "revision": "Ember@2.9.1",
            "loc": {
              "source": null,
              "start": {
                "line": 4,
                "column": 3
              },
              "end": {
                "line": 9,
                "column": 3
              }
            },
            "moduleName": "micro-expense-tracker/templates/components/global-notifications.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("				");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            var el2 = dom.createTextNode("\n					");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("button");
            dom.setAttribute(el2, "class", "delete");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n					");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n				");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var element1 = dom.childAt(element0, [1]);
            var morphs = new Array(3);
            morphs[0] = dom.createAttrMorph(element0, 'class');
            morphs[1] = dom.createAttrMorph(element1, 'onclick');
            morphs[2] = dom.createMorphAt(element0, 3, 3);
            return morphs;
          },
          statements: [["attribute", "class", ["concat", ["notification ", ["get", "notification.class", ["loc", [null, [5, 31], [5, 49]]], 0, 0, 0, 0]], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "onclick", ["subexpr", "action", ["removeNotification", ["get", "notification.id", ["loc", [null, [6, 66], [6, 81]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [6, 83]]], 0, 0], 0, 0, 0, 0], ["content", "notification.message", ["loc", [null, [7, 5], [7, 29]]], 0, 0, 0, 0]],
          locals: ["notification"],
          templates: []
        };
      }();
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 12,
              "column": 0
            }
          },
          "moduleName": "micro-expense-tracker/templates/components/global-notifications.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "notifications-container");
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "container");
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("		");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n	");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1]), 1, 1);
          return morphs;
        },
        statements: [["block", "each", [["get", "notifications", ["loc", [null, [4, 11], [4, 24]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [4, 3], [9, 12]]]]],
        locals: [],
        templates: [child0]
      };
    }();
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 14,
            "column": 0
          }
        },
        "moduleName": "micro-expense-tracker/templates/components/global-notifications.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "if", [["get", "notifications.length", ["loc", [null, [1, 6], [1, 26]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [1, 0], [12, 7]]]]],
      locals: [],
      templates: [child0]
    };
  }());
});
define("micro-expense-tracker/templates/components/options/import-data", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    var child0 = function () {
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 15,
              "column": 4
            },
            "end": {
              "line": 19,
              "column": 4
            }
          },
          "moduleName": "micro-expense-tracker/templates/components/options/import-data.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("					");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          dom.setAttribute(el1, "class", "help is-danger");
          var el2 = dom.createTextNode("\n						");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n					");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["inline", "t", ["components.options.import_data.step_1_invalid_file"], [], ["loc", [null, [17, 6], [17, 64]]], 0, 0]],
        locals: [],
        templates: []
      };
    }();
    var child1 = function () {
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 21,
              "column": 3
            },
            "end": {
              "line": 28,
              "column": 3
            }
          },
          "moduleName": "micro-expense-tracker/templates/components/options/import-data.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("				");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h3");
          var el2 = dom.createElement("strong");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(":");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n				");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("ul");
          dom.setAttribute(el1, "class", "step");
          var el2 = dom.createTextNode("\n					");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          var el3 = dom.createElement("strong");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode(":");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(" ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n					");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          var el3 = dom.createElement("strong");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode(":");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(" ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n					");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          var el3 = dom.createElement("strong");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode(":");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(" ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n				");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(fragment, [3]);
          var element2 = dom.childAt(element1, [1]);
          var element3 = dom.childAt(element1, [3]);
          var element4 = dom.childAt(element1, [5]);
          var morphs = new Array(8);
          morphs[0] = dom.createMorphAt(dom.childAt(element0, [0]), 0, 0);
          morphs[1] = dom.createMorphAt(element0, 2, 2);
          morphs[2] = dom.createMorphAt(dom.childAt(element2, [0]), 0, 0);
          morphs[3] = dom.createMorphAt(element2, 2, 2);
          morphs[4] = dom.createMorphAt(dom.childAt(element3, [0]), 0, 0);
          morphs[5] = dom.createMorphAt(element3, 2, 2);
          morphs[6] = dom.createMorphAt(dom.childAt(element4, [0]), 0, 0);
          morphs[7] = dom.createMorphAt(element4, 2, 2);
          return morphs;
        },
        statements: [["inline", "t", ["components.options.import_data.step_2_header"], [], ["loc", [null, [22, 16], [22, 68]]], 0, 0], ["inline", "t", ["components.options.import_data.step_2_body"], [], ["loc", [null, [22, 79], [22, 129]]], 0, 0], ["inline", "t", ["components.options.import_data.step_2_categories"], [], ["loc", [null, [24, 17], [24, 73]]], 0, 0], ["content", "categoriesCount", ["loc", [null, [24, 84], [24, 103]]], 0, 0, 0, 0], ["inline", "t", ["components.options.import_data.step_2_expenses"], [], ["loc", [null, [25, 17], [25, 71]]], 0, 0], ["content", "expensesCount", ["loc", [null, [25, 82], [25, 99]]], 0, 0, 0, 0], ["inline", "t", ["components.options.import_data.step_2_expense_months"], [], ["loc", [null, [26, 17], [26, 77]]], 0, 0], ["content", "expenseMonthsCount", ["loc", [null, [26, 88], [26, 110]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    }();
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 35,
            "column": 6
          }
        },
        "moduleName": "micro-expense-tracker/templates/components/options/import-data.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "modal-background");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "modal-card");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("header");
        dom.setAttribute(el3, "class", "modal-card-head");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        dom.setAttribute(el4, "class", "modal-card-title");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4, "class", "delete");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("section");
        dom.setAttribute(el3, "class", "modal-card-body");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        dom.setAttribute(el4, "class", "help");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h3");
        var el5 = dom.createElement("strong");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode(":");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "step");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5, "type", "file");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("footer");
        dom.setAttribute(el3, "class", "modal-card-foot");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "class", "button is-success");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "class", "button");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element5 = dom.childAt(fragment, [0]);
        var element6 = dom.childAt(element5, [3]);
        var element7 = dom.childAt(element6, [1]);
        var element8 = dom.childAt(element7, [3]);
        var element9 = dom.childAt(element6, [3]);
        var element10 = dom.childAt(element9, [3]);
        var element11 = dom.childAt(element9, [5]);
        var element12 = dom.childAt(element11, [1]);
        var element13 = dom.childAt(element6, [5]);
        var element14 = dom.childAt(element13, [1]);
        var element15 = dom.childAt(element13, [3]);
        var morphs = new Array(14);
        morphs[0] = dom.createAttrMorph(element5, 'class');
        morphs[1] = dom.createMorphAt(dom.childAt(element7, [1]), 0, 0);
        morphs[2] = dom.createElementMorph(element8);
        morphs[3] = dom.createMorphAt(dom.childAt(element9, [1]), 1, 1);
        morphs[4] = dom.createMorphAt(dom.childAt(element10, [0]), 0, 0);
        morphs[5] = dom.createMorphAt(element10, 2, 2);
        morphs[6] = dom.createAttrMorph(element12, 'onchange');
        morphs[7] = dom.createMorphAt(element11, 3, 3);
        morphs[8] = dom.createMorphAt(element9, 7, 7);
        morphs[9] = dom.createAttrMorph(element14, 'disabled');
        morphs[10] = dom.createAttrMorph(element14, 'onclick');
        morphs[11] = dom.createMorphAt(element14, 0, 0);
        morphs[12] = dom.createElementMorph(element15);
        morphs[13] = dom.createMorphAt(element15, 0, 0);
        return morphs;
      },
      statements: [["attribute", "class", ["concat", ["modal ", ["subexpr", "if", [["get", "isVisible", ["loc", [null, [1, 23], [1, 32]]], 0, 0, 0, 0], "is-active"], [], ["loc", [null, [1, 18], [1, 46]]], 0, 0], " import-data-component"], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["inline", "t", ["components.options.import_data.header"], [], ["loc", [null, [5, 31], [5, 76]]], 0, 0], ["element", "action", ["cancel"], [], ["loc", [null, [6, 26], [6, 45]]], 0, 0], ["inline", "t", ["components.options.import_data.warning"], [], ["loc", [null, [10, 4], [10, 50]]], 0, 0], ["inline", "t", ["components.options.import_data.step_1_header"], [], ["loc", [null, [12, 15], [12, 67]]], 0, 0], ["inline", "t", ["components.options.import_data.step_1_body"], [], ["loc", [null, [12, 78], [12, 128]]], 0, 0], ["attribute", "onchange", ["subexpr", "action", ["fileSelected"], [], ["loc", [null, [null, null], [14, 58]]], 0, 0], 0, 0, 0, 0], ["block", "if", [["get", "isInvalidFile", ["loc", [null, [15, 10], [15, 23]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [15, 4], [19, 11]]]], ["block", "if", [["get", "importedJson", ["loc", [null, [21, 9], [21, 21]]], 0, 0, 0, 0]], [], 1, null, ["loc", [null, [21, 3], [28, 10]]]], ["attribute", "disabled", ["get", "isSaveDisabled", ["loc", [null, [31, 43], [31, 57]]], 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "onclick", ["subexpr", "action", ["save"], [], ["loc", [null, [null, null], [31, 85]]], 0, 0], 0, 0, 0, 0], ["inline", "t", ["components.options.import_data.button_import"], [], ["loc", [null, [31, 86], [31, 138]]], 0, 0], ["element", "action", ["cancel"], [], ["loc", [null, [32, 21], [32, 40]]], 0, 0], ["inline", "t", ["components.options.import_data.button_cancel"], [], ["loc", [null, [32, 41], [32, 93]]], 0, 0]],
      locals: [],
      templates: [child0, child1]
    };
  }());
});
define("micro-expense-tracker/templates/components/select-input", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    var child0 = function () {
      var child0 = function () {
        return {
          meta: {
            "revision": "Ember@2.9.1",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 1
              },
              "end": {
                "line": 4,
                "column": 1
              }
            },
            "moduleName": "micro-expense-tracker/templates/components/select-input.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("		");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("option");
            dom.setAttribute(el1, "value", "");
            dom.setAttribute(el1, "selected", "");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
            return morphs;
          },
          statements: [["content", "firstOption", ["loc", [null, [3, 28], [3, 43]]], 0, 0, 0, 0]],
          locals: [],
          templates: []
        };
      }();
      var child1 = function () {
        return {
          meta: {
            "revision": "Ember@2.9.1",
            "loc": {
              "source": null,
              "start": {
                "line": 4,
                "column": 1
              },
              "end": {
                "line": 6,
                "column": 1
              }
            },
            "moduleName": "micro-expense-tracker/templates/components/select-input.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("		");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("option");
            dom.setAttribute(el1, "value", "");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
            return morphs;
          },
          statements: [["content", "firstOption", ["loc", [null, [5, 19], [5, 34]]], 0, 0, 0, 0]],
          locals: [],
          templates: []
        };
      }();
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 7,
              "column": 0
            }
          },
          "moduleName": "micro-expense-tracker/templates/components/select-input.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["subexpr", "eq", [["get", "selectedValue", ["loc", [null, [2, 11], [2, 24]]], 0, 0, 0, 0], ""], [], ["loc", [null, [2, 7], [2, 28]]], 0, 0]], [], 0, 1, ["loc", [null, [2, 1], [6, 8]]]]],
        locals: [],
        templates: [child0, child1]
      };
    }();
    var child1 = function () {
      var child0 = function () {
        var child0 = function () {
          return {
            meta: {
              "revision": "Ember@2.9.1",
              "loc": {
                "source": null,
                "start": {
                  "line": 11,
                  "column": 2
                },
                "end": {
                  "line": 13,
                  "column": 2
                }
              },
              "moduleName": "micro-expense-tracker/templates/components/select-input.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("			");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("option");
              dom.setAttribute(el1, "selected", "");
              var el2 = dom.createComment("");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element3 = dom.childAt(fragment, [1]);
              var morphs = new Array(2);
              morphs[0] = dom.createAttrMorph(element3, 'value');
              morphs[1] = dom.createMorphAt(element3, 0, 0);
              return morphs;
            },
            statements: [["attribute", "value", ["concat", [["get", "option.value", ["loc", [null, [12, 20], [12, 32]]], 0, 0, 0, 0]], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["content", "option.name", ["loc", [null, [12, 45], [12, 60]]], 0, 0, 0, 0]],
            locals: [],
            templates: []
          };
        }();
        var child1 = function () {
          return {
            meta: {
              "revision": "Ember@2.9.1",
              "loc": {
                "source": null,
                "start": {
                  "line": 13,
                  "column": 2
                },
                "end": {
                  "line": 15,
                  "column": 2
                }
              },
              "moduleName": "micro-expense-tracker/templates/components/select-input.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("			");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("option");
              var el2 = dom.createComment("");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element2 = dom.childAt(fragment, [1]);
              var morphs = new Array(2);
              morphs[0] = dom.createAttrMorph(element2, 'value');
              morphs[1] = dom.createMorphAt(element2, 0, 0);
              return morphs;
            },
            statements: [["attribute", "value", ["concat", [["get", "option.value", ["loc", [null, [14, 20], [14, 32]]], 0, 0, 0, 0]], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["content", "option.name", ["loc", [null, [14, 36], [14, 51]]], 0, 0, 0, 0]],
            locals: [],
            templates: []
          };
        }();
        return {
          meta: {
            "revision": "Ember@2.9.1",
            "loc": {
              "source": null,
              "start": {
                "line": 10,
                "column": 1
              },
              "end": {
                "line": 16,
                "column": 1
              }
            },
            "moduleName": "micro-expense-tracker/templates/components/select-input.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "if", [["subexpr", "eq", [["get", "option.value", ["loc", [null, [11, 12], [11, 24]]], 0, 0, 0, 0], ["get", "selectedValue", ["loc", [null, [11, 25], [11, 38]]], 0, 0, 0, 0]], [], ["loc", [null, [11, 8], [11, 39]]], 0, 0]], [], 0, 1, ["loc", [null, [11, 2], [15, 9]]]]],
          locals: [],
          templates: [child0, child1]
        };
      }();
      var child1 = function () {
        var child0 = function () {
          return {
            meta: {
              "revision": "Ember@2.9.1",
              "loc": {
                "source": null,
                "start": {
                  "line": 17,
                  "column": 2
                },
                "end": {
                  "line": 19,
                  "column": 2
                }
              },
              "moduleName": "micro-expense-tracker/templates/components/select-input.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("			");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("option");
              dom.setAttribute(el1, "selected", "");
              var el2 = dom.createComment("");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element1 = dom.childAt(fragment, [1]);
              var morphs = new Array(2);
              morphs[0] = dom.createAttrMorph(element1, 'value');
              morphs[1] = dom.createMorphAt(element1, 0, 0);
              return morphs;
            },
            statements: [["attribute", "value", ["concat", [["get", "option", ["loc", [null, [18, 20], [18, 26]]], 0, 0, 0, 0]], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["content", "option", ["loc", [null, [18, 39], [18, 49]]], 0, 0, 0, 0]],
            locals: [],
            templates: []
          };
        }();
        var child1 = function () {
          return {
            meta: {
              "revision": "Ember@2.9.1",
              "loc": {
                "source": null,
                "start": {
                  "line": 19,
                  "column": 2
                },
                "end": {
                  "line": 21,
                  "column": 2
                }
              },
              "moduleName": "micro-expense-tracker/templates/components/select-input.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("			");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("option");
              var el2 = dom.createComment("");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element0 = dom.childAt(fragment, [1]);
              var morphs = new Array(2);
              morphs[0] = dom.createAttrMorph(element0, 'value');
              morphs[1] = dom.createMorphAt(element0, 0, 0);
              return morphs;
            },
            statements: [["attribute", "value", ["concat", [["get", "option", ["loc", [null, [20, 20], [20, 26]]], 0, 0, 0, 0]], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["content", "option", ["loc", [null, [20, 30], [20, 40]]], 0, 0, 0, 0]],
            locals: [],
            templates: []
          };
        }();
        return {
          meta: {
            "revision": "Ember@2.9.1",
            "loc": {
              "source": null,
              "start": {
                "line": 16,
                "column": 1
              },
              "end": {
                "line": 22,
                "column": 1
              }
            },
            "moduleName": "micro-expense-tracker/templates/components/select-input.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "if", [["subexpr", "eq", [["get", "option", ["loc", [null, [17, 12], [17, 18]]], 0, 0, 0, 0], ["get", "selectedValue", ["loc", [null, [17, 19], [17, 32]]], 0, 0, 0, 0]], [], ["loc", [null, [17, 8], [17, 33]]], 0, 0]], [], 0, 1, ["loc", [null, [17, 2], [21, 9]]]]],
          locals: [],
          templates: [child0, child1]
        };
      }();
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 9,
              "column": 0
            },
            "end": {
              "line": 23,
              "column": 0
            }
          },
          "moduleName": "micro-expense-tracker/templates/components/select-input.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["subexpr", "and", [["get", "option.name", ["loc", [null, [10, 12], [10, 23]]], 0, 0, 0, 0], ["get", "option.value", ["loc", [null, [10, 24], [10, 36]]], 0, 0, 0, 0]], [], ["loc", [null, [10, 7], [10, 37]]], 0, 0]], [], 0, 1, ["loc", [null, [10, 1], [22, 8]]]]],
        locals: ["option"],
        templates: [child0, child1]
      };
    }();
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 24,
            "column": 0
          }
        },
        "moduleName": "micro-expense-tracker/templates/components/select-input.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "firstOption", ["loc", [null, [1, 6], [1, 17]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [1, 0], [7, 7]]]], ["block", "each", [["get", "options", ["loc", [null, [9, 8], [9, 15]]], 0, 0, 0, 0]], [], 1, null, ["loc", [null, [9, 0], [23, 9]]]]],
      locals: [],
      templates: [child0, child1]
    };
  }());
});
define("micro-expense-tracker/templates/expenses", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "micro-expense-tracker/templates/expenses.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  }());
});
define("micro-expense-tracker/templates/expenses/edit", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 23,
            "column": 0
          }
        },
        "moduleName": "micro-expense-tracker/templates/expenses/edit.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("article");
        dom.setAttribute(el1, "class", "expense-edit-route");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h1");
        dom.setAttribute(el2, "class", "title");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "columns");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "column is-12 is-6-tablet is-4-desktop");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("form");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "field");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("p");
        dom.setAttribute(el6, "class", "control");
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("label");
        dom.setAttribute(el7, "class", "label");
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        dom.setAttribute(el5, "class", "control");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("button");
        dom.setAttribute(el6, "class", "category-save button is-success");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("button");
        dom.setAttribute(el6, "class", "category-save button is-outlined");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [3, 1, 1]);
        var element2 = dom.childAt(element1, [3, 1]);
        var element3 = dom.childAt(element1, [5]);
        var element4 = dom.childAt(element3, [3]);
        var morphs = new Array(8);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 0, 0);
        morphs[1] = dom.createAttrMorph(element1, 'onsubmit');
        morphs[2] = dom.createMorphAt(element1, 1, 1);
        morphs[3] = dom.createMorphAt(dom.childAt(element2, [1]), 0, 0);
        morphs[4] = dom.createMorphAt(element2, 3, 3);
        morphs[5] = dom.createMorphAt(dom.childAt(element3, [1]), 0, 0);
        morphs[6] = dom.createAttrMorph(element4, 'onclick');
        morphs[7] = dom.createMorphAt(element4, 0, 0);
        return morphs;
      },
      statements: [["inline", "t", ["section.expenses.edit.title"], ["name", ["subexpr", "@mut", [["get", "expenseOriginal.name", ["loc", [null, [2, 58], [2, 78]]], 0, 0, 0, 0]], [], [], 0, 0], "date", ["subexpr", "date-format", [["get", "expenseOriginal.purchasedAt", ["loc", [null, [2, 97], [2, 124]]], 0, 0, 0, 0]], [], ["loc", [null, [2, 84], [2, 125]]], 0, 0]], ["loc", [null, [2, 19], [2, 127]]], 0, 0], ["attribute", "onsubmit", ["subexpr", "action", ["saveHandler"], [], ["loc", [null, [null, null], [5, 42]]], 0, 0], 0, 0, 0, 0], ["inline", "expenses-editor", [], ["index", ["subexpr", "@mut", [["get", "index", ["loc", [null, [6, 28], [6, 33]]], 0, 0, 0, 0]], [], [], 0, 0], "model", ["subexpr", "@mut", [["get", "expense", ["loc", [null, [6, 40], [6, 47]]], 0, 0, 0, 0]], [], [], 0, 0], "options", ["subexpr", "@mut", [["get", "categories", ["loc", [null, [6, 56], [6, 66]]], 0, 0, 0, 0]], [], [], 0, 0], "onChange", ["subexpr", "action", ["expenseChanged"], [], ["loc", [null, [6, 76], [6, 101]]], 0, 0], "vertical", true], ["loc", [null, [6, 4], [6, 117]]], 0, 0], ["inline", "t", ["section.expenses.new_receipt.receipt_date"], [], ["loc", [null, [10, 27], [10, 76]]], 0, 0], ["inline", "pikaday-input", [], ["onSelection", ["subexpr", "action", ["dateChanged"], [], ["loc", [null, [11, 34], [11, 56]]], 0, 0], "format", "DD-MM-YYYY", "value", ["subexpr", "@mut", [["get", "expense.purchasedAt", ["loc", [null, [11, 83], [11, 102]]], 0, 0, 0, 0]], [], [], 0, 0], "class", "input receipt-date"], ["loc", [null, [11, 6], [11, 131]]], 0, 0], ["inline", "t", ["section.expenses.new_receipt.save"], [], ["loc", [null, [16, 53], [16, 94]]], 0, 0], ["attribute", "onclick", ["subexpr", "action", ["cancelHandler"], [], ["loc", [null, [null, null], [17, 88]]], 0, 0], 0, 0, 0, 0], ["inline", "t", ["section.expenses.new_receipt.cancel"], [], ["loc", [null, [17, 89], [17, 132]]], 0, 0]],
      locals: [],
      templates: []
    };
  }());
});
define("micro-expense-tracker/templates/expenses/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    var child0 = function () {
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 12,
              "column": 4
            },
            "end": {
              "line": 12,
              "column": 107
            }
          },
          "moduleName": "micro-expense-tracker/templates/expenses/index.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["inline", "t", ["section.expenses.index.add_new_receipt"], [], ["loc", [null, [12, 61], [12, 107]]], 0, 0]],
        locals: [],
        templates: []
      };
    }();
    var child1 = function () {
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 22,
              "column": 6
            },
            "end": {
              "line": 22,
              "column": 54
            }
          },
          "moduleName": "micro-expense-tracker/templates/expenses/index.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode(" / ");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          return morphs;
        },
        statements: [["content", "filteredExpenses.length", ["loc", [null, [22, 24], [22, 51]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    }();
    var child2 = function () {
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 38,
              "column": 4
            },
            "end": {
              "line": 45,
              "column": 4
            }
          },
          "moduleName": "micro-expense-tracker/templates/expenses/index.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("					");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("a");
          dom.setAttribute(el1, "class", "button is-info is-small");
          var el2 = dom.createTextNode("\n						");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("span");
          var el3 = dom.createElement("strong");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(" ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n					    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("span");
          dom.setAttribute(el2, "class", "icon");
          var el3 = dom.createTextNode("\n					      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("i");
          dom.setAttribute(el3, "class", "fa fa-close");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n					    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n					");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element3 = dom.childAt(fragment, [1]);
          var element4 = dom.childAt(element3, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createElementMorph(element3);
          morphs[1] = dom.createMorphAt(dom.childAt(element4, [0]), 0, 0);
          morphs[2] = dom.createMorphAt(element4, 2, 2);
          return morphs;
        },
        statements: [["element", "action", ["removeFilter", "filterCategoryId"], [], ["loc", [null, [39, 40], [39, 84]]], 0, 0], ["inline", "t", ["section.expenses.index.filters.by_category"], [], ["loc", [null, [40, 20], [40, 70]]], 0, 0], ["content", "filterCategory.namePath", ["loc", [null, [40, 80], [40, 107]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    }();
    var child3 = function () {
      var child0 = function () {
        var child0 = function () {
          return {
            meta: {
              "revision": "Ember@2.9.1",
              "loc": {
                "source": null,
                "start": {
                  "line": 72,
                  "column": 7
                },
                "end": {
                  "line": 76,
                  "column": 7
                }
              },
              "moduleName": "micro-expense-tracker/templates/expenses/index.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("								");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("i");
              dom.setAttribute(el1, "class", "fa fa-filter fa-lg");
              dom.setAttribute(el1, "aria-hidden", "true");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes() {
              return [];
            },
            statements: [],
            locals: [],
            templates: []
          };
        }();
        return {
          meta: {
            "revision": "Ember@2.9.1",
            "loc": {
              "source": null,
              "start": {
                "line": 69,
                "column": 6
              },
              "end": {
                "line": 77,
                "column": 6
              }
            },
            "moduleName": "micro-expense-tracker/templates/expenses/index.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("							");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n\n");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(2);
            morphs[0] = dom.createUnsafeMorphAt(fragment, 1, 1, contextualElement);
            morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["content", "row.category.namePathForHtml", ["loc", [null, [70, 7], [70, 41]]], 0, 0, 0, 0], ["block", "link-to", ["expenses.index", ["subexpr", "query-params", [], ["filter-category-id", ["get", "row.category.id", ["loc", [null, [73, 51], [73, 66]]], 0, 0, 0, 0]], ["loc", [null, [73, 18], [73, 67]]], 0, 0]], ["title", ["subexpr", "t", ["section.expenses.index.filter_by_category"], [], ["loc", [null, [74, 24], [74, 71]]], 0, 0]], 0, null, ["loc", [null, [72, 7], [76, 19]]]]],
          locals: [],
          templates: [child0]
        };
      }();
      var child1 = function () {
        return {
          meta: {
            "revision": "Ember@2.9.1",
            "loc": {
              "source": null,
              "start": {
                "line": 77,
                "column": 6
              },
              "end": {
                "line": 79,
                "column": 6
              }
            },
            "moduleName": "micro-expense-tracker/templates/expenses/index.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("							");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "t", ["section.expenses.index.missing_category"], [], ["loc", [null, [78, 7], [78, 54]]], 0, 0]],
          locals: [],
          templates: []
        };
      }();
      var child2 = function () {
        return {
          meta: {
            "revision": "Ember@2.9.1",
            "loc": {
              "source": null,
              "start": {
                "line": 82,
                "column": 6
              },
              "end": {
                "line": 84,
                "column": 6
              }
            },
            "moduleName": "micro-expense-tracker/templates/expenses/index.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("							");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "moment-format", [["get", "row.purchasedAt", ["loc", [null, [83, 23], [83, 38]]], 0, 0, 0, 0], "DD-MM-YYYY"], [], ["loc", [null, [83, 7], [83, 53]]], 0, 0]],
          locals: [],
          templates: []
        };
      }();
      var child3 = function () {
        return {
          meta: {
            "revision": "Ember@2.9.1",
            "loc": {
              "source": null,
              "start": {
                "line": 84,
                "column": 6
              },
              "end": {
                "line": 86,
                "column": 6
              }
            },
            "moduleName": "micro-expense-tracker/templates/expenses/index.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("							");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "t", ["section.expenses.index.missing_expense_date"], [], ["loc", [null, [85, 7], [85, 58]]], 0, 0]],
          locals: [],
          templates: []
        };
      }();
      var child4 = function () {
        return {
          meta: {
            "revision": "Ember@2.9.1",
            "loc": {
              "source": null,
              "start": {
                "line": 90,
                "column": 21
              },
              "end": {
                "line": 92,
                "column": 21
              }
            },
            "moduleName": "micro-expense-tracker/templates/expenses/index.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("		                    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("i");
            dom.setAttribute(el1, "class", "fa fa-edit");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      }();
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 62,
              "column": 3
            },
            "end": {
              "line": 101,
              "column": 3
            }
          },
          "moduleName": "micro-expense-tracker/templates/expenses/index.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("				");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("tr");
          var el2 = dom.createTextNode("\n					");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n					");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createTextNode("\n						");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n					");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n					");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("					");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n					");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("					");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n					");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createTextNode("\n                    ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          dom.setAttribute(el3, "class", "icon");
          var el4 = dom.createTextNode("\n");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("                    ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n						");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          dom.setAttribute(el3, "class", "icon");
          var el4 = dom.createTextNode("\n                        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("a");
          dom.setAttribute(el4, "href", "#");
          var el5 = dom.createTextNode("\n                            ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("i");
          dom.setAttribute(el5, "class", "fa fa-remove");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n                        ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                    ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n					");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n				");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [9]);
          var element2 = dom.childAt(element1, [3, 1]);
          var morphs = new Array(7);
          morphs[0] = dom.createUnsafeMorphAt(dom.childAt(element0, [1]), 0, 0);
          morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]), 1, 1);
          morphs[2] = dom.createMorphAt(dom.childAt(element0, [5]), 1, 1);
          morphs[3] = dom.createMorphAt(dom.childAt(element0, [7]), 1, 1);
          morphs[4] = dom.createMorphAt(dom.childAt(element1, [1]), 1, 1);
          morphs[5] = dom.createAttrMorph(element2, 'title');
          morphs[6] = dom.createElementMorph(element2);
          return morphs;
        },
        statements: [["content", "row.name", ["loc", [null, [64, 9], [64, 23]]], 0, 0, 0, 0], ["inline", "currency-format", [["get", "row.realPrice", ["loc", [null, [66, 24], [66, 37]]], 0, 0, 0, 0]], [], ["loc", [null, [66, 6], [66, 39]]], 0, 0], ["block", "if", [["get", "row.category", ["loc", [null, [69, 12], [69, 24]]], 0, 0, 0, 0]], [], 0, 1, ["loc", [null, [69, 6], [79, 13]]]], ["block", "if", [["get", "row.purchasedAt", ["loc", [null, [82, 12], [82, 27]]], 0, 0, 0, 0]], [], 2, 3, ["loc", [null, [82, 6], [86, 13]]]], ["block", "link-to", ["expenses.edit", ["get", "row.id", ["loc", [null, [90, 48], [90, 54]]], 0, 0, 0, 0]], ["title", ["subexpr", "t", ["section.expenses.index.action.edit"], ["expense", ["get", "row.name", ["loc", [null, [90, 109], [90, 117]]], 0, 0, 0, 0]], ["loc", [null, [90, 61], [90, 118]]], 0, 0]], 4, null, ["loc", [null, [90, 21], [92, 33]]]], ["attribute", "title", ["subexpr", "t", ["section.expenses.index.action.delete"], ["expense", ["get", "row.name", ["loc", [null, [95, 127], [95, 135]]], 0, 0, 0, 0]], ["loc", [null, [null, null], [95, 137]]], 0, 0], 0, 0, 0, 0], ["element", "action", ["deleteExpense", ["get", "row.id", ["loc", [null, [95, 61], [95, 67]]], 0, 0, 0, 0]], [], ["loc", [null, [95, 36], [95, 69]]], 0, 0]],
        locals: ["row"],
        templates: [child0, child1, child2, child3, child4]
      };
    }();
    var child4 = function () {
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 101,
              "column": 3
            },
            "end": {
              "line": 107,
              "column": 3
            }
          },
          "moduleName": "micro-expense-tracker/templates/expenses/index.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("				");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("tr");
          dom.setAttribute(el1, "class", "no-data");
          var el2 = dom.createTextNode("\n					");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          dom.setAttribute(el2, "colspan", "5");
          var el3 = dom.createTextNode("\n						");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n					");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n				");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createUnsafeMorphAt(dom.childAt(fragment, [1, 1]), 1, 1);
          return morphs;
        },
        statements: [["inline", "t", ["section.categories.index.empty_row"], ["button", ["subexpr", "t", ["section.categories.index.add_new_category"], [], ["loc", [null, [104, 55], [104, 102]]], 0, 0]], ["loc", [null, [104, 6], [104, 105]]], 0, 0]],
        locals: [],
        templates: []
      };
    }();
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 111,
            "column": 6
          }
        },
        "moduleName": "micro-expense-tracker/templates/expenses/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "expenses-index-route");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h1");
        dom.setAttribute(el2, "class", "container title");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("nav");
        dom.setAttribute(el2, "class", "level");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "level-left");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "level-item");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        dom.setAttribute(el5, "class", "subtitle is-5");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode(":\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "level-item");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "level-right");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "level-item");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        dom.setAttribute(el5, "class", "subtitle is-5");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode(":\n\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("strong");
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("nav");
        dom.setAttribute(el2, "class", "level");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "level-left level-wrap");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "level-item");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        dom.setAttribute(el5, "class", "subtitle is-5");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode(":\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "level-item");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("article");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("table");
        dom.setAttribute(el3, "class", "table data-table");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("thead");
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("tr");
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("th");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("th");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("th");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("th");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("th");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n			");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tbody");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element5 = dom.childAt(fragment, [0]);
        var element6 = dom.childAt(element5, [3]);
        var element7 = dom.childAt(element6, [1]);
        var element8 = dom.childAt(element6, [3, 1, 1]);
        var element9 = dom.childAt(element8, [3]);
        var element10 = dom.childAt(element5, [5, 1]);
        var element11 = dom.childAt(element10, [1, 1]);
        var element12 = dom.childAt(element5, [7, 1]);
        var element13 = dom.childAt(element12, [1, 1]);
        var morphs = new Array(15);
        morphs[0] = dom.createMorphAt(dom.childAt(element5, [1]), 0, 0);
        morphs[1] = dom.createMorphAt(dom.childAt(element7, [1, 1]), 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(element7, [3]), 1, 1);
        morphs[3] = dom.createMorphAt(element8, 1, 1);
        morphs[4] = dom.createMorphAt(element9, 1, 1);
        morphs[5] = dom.createMorphAt(element9, 2, 2);
        morphs[6] = dom.createMorphAt(element11, 1, 1);
        morphs[7] = dom.createMorphAt(element11, 3, 3);
        morphs[8] = dom.createMorphAt(dom.childAt(element10, [3]), 1, 1);
        morphs[9] = dom.createMorphAt(dom.childAt(element13, [1]), 0, 0);
        morphs[10] = dom.createMorphAt(dom.childAt(element13, [3]), 0, 0);
        morphs[11] = dom.createMorphAt(dom.childAt(element13, [5]), 0, 0);
        morphs[12] = dom.createMorphAt(dom.childAt(element13, [7]), 0, 0);
        morphs[13] = dom.createMorphAt(dom.childAt(element13, [9]), 0, 0);
        morphs[14] = dom.createMorphAt(dom.childAt(element12, [3]), 1, 1);
        return morphs;
      },
      statements: [["inline", "t", ["section.expenses.title"], [], ["loc", [null, [2, 29], [2, 59]]], 0, 0], ["inline", "t", ["section.expenses.index.actions"], [], ["loc", [null, [8, 5], [8, 43]]], 0, 0], ["block", "link-to", ["expenses.receipt"], ["class", "button is-primary"], 0, null, ["loc", [null, [12, 4], [12, 119]]]], ["inline", "t", ["section.expenses.index.expenses"], [], ["loc", [null, [19, 5], [19, 44]]], 0, 0], ["block", "if", [["get", "isFiltered", ["loc", [null, [22, 12], [22, 22]]], 0, 0, 0, 0]], [], 1, null, ["loc", [null, [22, 6], [22, 61]]]], ["content", "model.expenses.length", ["loc", [null, [22, 61], [22, 86]]], 0, 0, 0, 0], ["inline", "t", ["section.expenses.index.filtering"], [], ["loc", [null, [33, 5], [33, 45]]], 0, 0], ["inline", "if", [["subexpr", "not", [["get", "isFiltered", ["loc", [null, [34, 15], [34, 25]]], 0, 0, 0, 0]], [], ["loc", [null, [34, 10], [34, 26]]], 0, 0], ["subexpr", "t", ["section.expenses.index.filters_none"], [], ["loc", [null, [34, 27], [34, 68]]], 0, 0]], [], ["loc", [null, [34, 5], [34, 70]]], 0, 0], ["block", "if", [["get", "filterCategory", ["loc", [null, [38, 10], [38, 24]]], 0, 0, 0, 0]], [], 2, null, ["loc", [null, [38, 4], [45, 11]]]], ["inline", "t", ["section.expenses.index.product"], [], ["loc", [null, [54, 8], [54, 46]]], 0, 0], ["inline", "t", ["section.expenses.index.final_price"], [], ["loc", [null, [55, 8], [55, 50]]], 0, 0], ["inline", "t", ["section.expenses.index.category"], [], ["loc", [null, [56, 8], [56, 47]]], 0, 0], ["inline", "t", ["section.expenses.index.expense_date"], [], ["loc", [null, [57, 8], [57, 51]]], 0, 0], ["inline", "t", ["section.expenses.index.actions"], [], ["loc", [null, [58, 8], [58, 46]]], 0, 0], ["block", "each", [["get", "sortedExpenses", ["loc", [null, [62, 11], [62, 25]]], 0, 0, 0, 0]], [], 3, 4, ["loc", [null, [62, 3], [107, 12]]]]],
      locals: [],
      templates: [child0, child1, child2, child3, child4]
    };
  }());
});
define("micro-expense-tracker/templates/expenses/new", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "micro-expense-tracker/templates/expenses/new.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  }());
});
define("micro-expense-tracker/templates/expenses/receipt", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    var child0 = function () {
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 13,
              "column": 2
            },
            "end": {
              "line": 15,
              "column": 2
            }
          },
          "moduleName": "micro-expense-tracker/templates/expenses/receipt.hbs"
        },
        isEmpty: false,
        arity: 2,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("			");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "expenses-editor", [], ["index", ["subexpr", "@mut", [["get", "index", ["loc", [null, [14, 27], [14, 32]]], 0, 0, 0, 0]], [], [], 0, 0], "model", ["subexpr", "@mut", [["get", "model", ["loc", [null, [14, 39], [14, 44]]], 0, 0, 0, 0]], [], [], 0, 0], "options", ["subexpr", "@mut", [["get", "categories", ["loc", [null, [14, 53], [14, 63]]], 0, 0, 0, 0]], [], [], 0, 0], "onChange", ["subexpr", "action", ["expenseChanged"], [], ["loc", [null, [14, 73], [14, 98]]], 0, 0]], ["loc", [null, [14, 3], [14, 100]]], 0, 0]],
        locals: ["index", "model"],
        templates: []
      };
    }();
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 22,
            "column": 0
          }
        },
        "moduleName": "micro-expense-tracker/templates/expenses/receipt.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("article");
        dom.setAttribute(el1, "class", "expenses-receipt-route");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h1");
        dom.setAttribute(el2, "class", "title");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("form");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "field");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        dom.setAttribute(el4, "class", "control");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5, "class", "label");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        dom.setAttribute(el3, "class", "label");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        dom.setAttribute(el3, "class", "control");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4, "class", "category-save button is-success");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4, "class", "category-save button is-outlined");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [3]);
        var element2 = dom.childAt(element1, [1, 1]);
        var element3 = dom.childAt(element1, [7]);
        var element4 = dom.childAt(element3, [3]);
        var morphs = new Array(9);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 0, 0);
        morphs[1] = dom.createAttrMorph(element1, 'onsubmit');
        morphs[2] = dom.createMorphAt(dom.childAt(element2, [1]), 0, 0);
        morphs[3] = dom.createMorphAt(element2, 3, 3);
        morphs[4] = dom.createMorphAt(dom.childAt(element1, [3]), 0, 0);
        morphs[5] = dom.createMorphAt(element1, 5, 5);
        morphs[6] = dom.createMorphAt(dom.childAt(element3, [1]), 0, 0);
        morphs[7] = dom.createAttrMorph(element4, 'onclick');
        morphs[8] = dom.createMorphAt(element4, 0, 0);
        return morphs;
      },
      statements: [["inline", "t", ["section.expenses.index.add_new_receipt"], [], ["loc", [null, [2, 19], [2, 65]]], 0, 0], ["attribute", "onsubmit", ["subexpr", "action", ["saveHandler"], [], ["loc", [null, [null, null], [3, 40]]], 0, 0], 0, 0, 0, 0], ["inline", "t", ["section.expenses.new_receipt.receipt_date"], [], ["loc", [null, [6, 25], [6, 74]]], 0, 0], ["inline", "pikaday-input", [], ["onSelection", ["subexpr", "action", ["dateChanged"], [], ["loc", [null, [7, 32], [7, 54]]], 0, 0], "format", "DD-MM-YYYY", "value", ["subexpr", "@mut", [["get", "receiptDate", ["loc", [null, [7, 81], [7, 92]]], 0, 0, 0, 0]], [], [], 0, 0], "class", "input receipt-date"], ["loc", [null, [7, 4], [7, 121]]], 0, 0], ["inline", "t", ["section.expenses.new_receipt.expenses"], [], ["loc", [null, [11, 23], [11, 68]]], 0, 0], ["block", "each-in", [["get", "expenses", ["loc", [null, [13, 13], [13, 21]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [13, 2], [15, 14]]]], ["inline", "t", ["section.expenses.new_receipt.save"], [], ["loc", [null, [17, 51], [17, 92]]], 0, 0], ["attribute", "onclick", ["subexpr", "action", ["cancelHandler"], [], ["loc", [null, [null, null], [18, 86]]], 0, 0], 0, 0, 0, 0], ["inline", "t", ["section.expenses.new_receipt.cancel"], [], ["loc", [null, [18, 87], [18, 130]]], 0, 0]],
      locals: [],
      templates: [child0]
    };
  }());
});
define("micro-expense-tracker/templates/install", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 27,
            "column": 10
          }
        },
        "moduleName": "micro-expense-tracker/templates/install.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("article");
        dom.setAttribute(el1, "class", "install-route");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "contents");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("img");
        dom.setAttribute(el3, "class", "logo");
        dom.setAttribute(el3, "src", "/assets/logo_white.svg");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h1");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "spacer");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        dom.setAttribute(el3, "class", "label");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        dom.setAttribute(el3, "class", "control language-selection");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "spacer");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        dom.setAttribute(el3, "class", "label");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        dom.setAttribute(el3, "class", "control currency-selection");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        dom.setAttribute(el3, "class", "hint");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "spacer");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3, "class", "button start-button");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1]);
        var element1 = dom.childAt(element0, [21]);
        var morphs = new Array(8);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [3]), 0, 0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [7]), 0, 0);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [9]), 1, 1);
        morphs[3] = dom.createMorphAt(dom.childAt(element0, [13]), 0, 0);
        morphs[4] = dom.createMorphAt(dom.childAt(element0, [15]), 1, 1);
        morphs[5] = dom.createMorphAt(dom.childAt(element0, [17]), 0, 0);
        morphs[6] = dom.createElementMorph(element1);
        morphs[7] = dom.createMorphAt(element1, 1, 1);
        return morphs;
      },
      statements: [["inline", "t", ["app.title"], [], ["loc", [null, [4, 6], [4, 23]]], 0, 0], ["inline", "t", ["section.options.language.lang"], [], ["loc", [null, [8, 23], [8, 60]]], 0, 0], ["inline", "common/button-bar", [], ["options", ["subexpr", "@mut", [["get", "optionsLanguage", ["loc", [null, [10, 31], [10, 46]]], 0, 0, 0, 0]], [], [], 0, 0], "value", ["subexpr", "@mut", [["get", "i18n.locale", ["loc", [null, [10, 53], [10, 64]]], 0, 0, 0, 0]], [], [], 0, 0], "action", "handleLanguageChanged"], ["loc", [null, [10, 3], [10, 97]]], 0, 0], ["inline", "t", ["section.options.language.currency"], [], ["loc", [null, [15, 23], [15, 64]]], 0, 0], ["inline", "common/button-bar", [], ["options", ["subexpr", "@mut", [["get", "optionsCurrencies", ["loc", [null, [17, 31], [17, 48]]], 0, 0, 0, 0]], [], [], 0, 0], "value", ["subexpr", "@mut", [["get", "selectedCurrency", ["loc", [null, [17, 55], [17, 71]]], 0, 0, 0, 0]], [], [], 0, 0], "action", "handleCurrencyChanged"], ["loc", [null, [17, 3], [17, 104]]], 0, 0], ["inline", "t", ["section.install.currency_hint"], [], ["loc", [null, [19, 18], [19, 55]]], 0, 0], ["element", "action", ["start"], [], ["loc", [null, [23, 33], [23, 52]]], 0, 0], ["inline", "t", ["section.install.start"], [], ["loc", [null, [24, 3], [24, 32]]], 0, 0]],
      locals: [],
      templates: []
    };
  }());
});
define("micro-expense-tracker/templates/options", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    var child0 = function () {
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 3
            },
            "end": {
              "line": 9,
              "column": 3
            }
          },
          "moduleName": "micro-expense-tracker/templates/options.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("				");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("a");
          var el2 = dom.createTextNode("\n					");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("span");
          dom.setAttribute(el2, "class", "icon is-small");
          var el3 = dom.createElement("i");
          dom.setAttribute(el3, "class", "fa fa-language");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n					");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("span");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n				");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 3]), 0, 0);
          return morphs;
        },
        statements: [["inline", "t", ["section.options.headers.language"], [], ["loc", [null, [7, 11], [7, 51]]], 0, 0]],
        locals: [],
        templates: []
      };
    }();
    var child1 = function () {
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 3
            },
            "end": {
              "line": 15,
              "column": 3
            }
          },
          "moduleName": "micro-expense-tracker/templates/options.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("				");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("a");
          var el2 = dom.createTextNode("\n					");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("span");
          dom.setAttribute(el2, "class", "icon is-small");
          var el3 = dom.createElement("i");
          dom.setAttribute(el3, "class", "fa fa-database");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n					");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("span");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n				");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 3]), 0, 0);
          return morphs;
        },
        statements: [["inline", "t", ["section.options.headers.storage"], [], ["loc", [null, [13, 11], [13, 50]]], 0, 0]],
        locals: [],
        templates: []
      };
    }();
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 28,
            "column": 0
          }
        },
        "moduleName": "micro-expense-tracker/templates/options.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "options-route");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "tabs");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1, 1]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(element1, 1, 1);
        morphs[1] = dom.createMorphAt(element1, 2, 2);
        morphs[2] = dom.createMorphAt(element0, 3, 3);
        return morphs;
      },
      statements: [["block", "link-to", ["options.language"], ["tagName", "li", "activeClass", "is-active"], 0, null, ["loc", [null, [4, 3], [9, 15]]]], ["block", "link-to", ["options.storage"], ["tagName", "li", "activeClass", "is-active"], 1, null, ["loc", [null, [10, 3], [15, 15]]]], ["content", "outlet", ["loc", [null, [26, 1], [26, 11]]], 0, 0, 0, 0]],
      locals: [],
      templates: [child0, child1]
    };
  }());
});
define("micro-expense-tracker/templates/options/language", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 31,
            "column": 6
          }
        },
        "moduleName": "micro-expense-tracker/templates/options/language.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "options-language-route");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "field option-language");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        dom.setAttribute(el3, "class", "label");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        dom.setAttribute(el3, "class", "control");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "field option-currency");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        dom.setAttribute(el3, "class", "label");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "field is-grouped center-vertical");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "field has-addons control");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        dom.setAttribute(el5, "class", "control");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("input");
        dom.setAttribute(el6, "class", "input input-prefix");
        dom.setAttribute(el6, "type", "text");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        dom.setAttribute(el5, "class", "control ");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("a");
        dom.setAttribute(el6, "class", "button input-example-value");
        dom.setAttribute(el6, "disabled", "disabled");
        var el7 = dom.createTextNode("53.20");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        dom.setAttribute(el5, "class", "control");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("input");
        dom.setAttribute(el6, "class", "input input-suffix");
        dom.setAttribute(el6, "type", "text");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "field control preview-label");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5, "class", "label");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode(":");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "control preview");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("53.20");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element0, [3]);
        var element3 = dom.childAt(element2, [3]);
        var element4 = dom.childAt(element3, [1]);
        var element5 = dom.childAt(element4, [1, 1]);
        var element6 = dom.childAt(element4, [5, 1]);
        var element7 = dom.childAt(element3, [5]);
        var morphs = new Array(10);
        morphs[0] = dom.createMorphAt(dom.childAt(element1, [1]), 0, 0);
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [3]), 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(element2, [1]), 0, 0);
        morphs[3] = dom.createAttrMorph(element5, 'value');
        morphs[4] = dom.createAttrMorph(element5, 'oninput');
        morphs[5] = dom.createAttrMorph(element6, 'value');
        morphs[6] = dom.createAttrMorph(element6, 'oninput');
        morphs[7] = dom.createMorphAt(dom.childAt(element3, [3, 1]), 0, 0);
        morphs[8] = dom.createMorphAt(element7, 1, 1);
        morphs[9] = dom.createMorphAt(element7, 3, 3);
        return morphs;
      },
      statements: [["inline", "t", ["section.options.language.lang"], [], ["loc", [null, [3, 23], [3, 60]]], 0, 0], ["inline", "common/button-bar", [], ["options", ["subexpr", "@mut", [["get", "optionsLanguage", ["loc", [null, [5, 31], [5, 46]]], 0, 0, 0, 0]], [], [], 0, 0], "value", ["subexpr", "@mut", [["get", "i18n.locale", ["loc", [null, [5, 53], [5, 64]]], 0, 0, 0, 0]], [], [], 0, 0], "action", "handleLanguageChanged"], ["loc", [null, [5, 3], [5, 97]]], 0, 0], ["inline", "t", ["section.options.language.currency"], [], ["loc", [null, [10, 23], [10, 64]]], 0, 0], ["attribute", "value", ["get", "currencyPrefix", ["loc", [null, [14, 59], [14, 73]]], 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "oninput", ["subexpr", "action", ["handlePrefixChanged"], [], ["loc", [null, [null, null], [14, 116]]], 0, 0], 0, 0, 0, 0], ["attribute", "value", ["get", "currencySuffix", ["loc", [null, [20, 59], [20, 73]]], 0, 0, 0, 0], 0, 0, 0, 0], ["attribute", "oninput", ["subexpr", "action", ["handleSuffixChanged"], [], ["loc", [null, [null, null], [20, 116]]], 0, 0], 0, 0, 0, 0], ["inline", "t", ["section.options.language.currency_preview"], [], ["loc", [null, [24, 25], [24, 74]]], 0, 0], ["content", "currencyPrefix", ["loc", [null, [27, 4], [27, 22]]], 0, 0, 0, 0], ["content", "currencySuffix", ["loc", [null, [27, 27], [27, 45]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  }());
});
define("micro-expense-tracker/templates/options/misc", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "micro-expense-tracker/templates/options/misc.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  }());
});
define("micro-expense-tracker/templates/options/storage", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    var child0 = function () {
      var child0 = function () {
        return {
          meta: {
            "revision": "Ember@2.9.1",
            "loc": {
              "source": null,
              "start": {
                "line": 49,
                "column": 5
              },
              "end": {
                "line": 51,
                "column": 5
              }
            },
            "moduleName": "micro-expense-tracker/templates/options/storage.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("						");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "t", ["section.options.storage.delete.delete_index"], ["index", ["subexpr", "@mut", [["get", "index", ["loc", [null, [50, 62], [50, 67]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [50, 6], [50, 69]]], 0, 0]],
          locals: [],
          templates: []
        };
      }();
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 47,
              "column": 3
            },
            "end": {
              "line": 53,
              "column": 3
            }
          },
          "moduleName": "micro-expense-tracker/templates/options/storage.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("				");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("				");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["block", "common/danger-button", [], ["onConfirm", ["subexpr", "action", ["deleteIndex", ["get", "index", ["loc", [null, [49, 61], [49, 66]]], 0, 0, 0, 0]], [], ["loc", [null, [49, 39], [49, 67]]], 0, 0]], 0, null, ["loc", [null, [49, 5], [51, 30]]]]],
        locals: ["index"],
        templates: [child0]
      };
    }();
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 58,
            "column": 6
          }
        },
        "moduleName": "micro-expense-tracker/templates/options/storage.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "options-storage-route");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "field option-import-export");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        dom.setAttribute(el3, "class", "label");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        dom.setAttribute(el3, "class", "help");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "field is-grouped");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        dom.setAttribute(el4, "class", "control");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("a");
        dom.setAttribute(el5, "class", "button is-info");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        dom.setAttribute(el4, "class", "control");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("a");
        dom.setAttribute(el5, "class", "button is-warning");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "field option-delete-index");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        dom.setAttribute(el3, "class", "label");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        dom.setAttribute(el3, "class", "help");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "field");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        dom.setAttribute(el4, "class", "control");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5, "class", "checkbox");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "field");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        dom.setAttribute(el4, "class", "control");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5, "class", "checkbox");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "field");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        dom.setAttribute(el4, "class", "control");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5, "class", "checkbox");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [5]);
        var element3 = dom.childAt(element2, [1, 1]);
        var element4 = dom.childAt(element2, [3, 1]);
        var element5 = dom.childAt(element0, [3]);
        var element6 = dom.childAt(element5, [5, 1, 1]);
        var element7 = dom.childAt(element5, [7, 1, 1]);
        var element8 = dom.childAt(element5, [9, 1, 1]);
        var element9 = dom.childAt(element5, [11]);
        var morphs = new Array(17);
        morphs[0] = dom.createMorphAt(dom.childAt(element1, [1]), 0, 0);
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [3]), 0, 0);
        morphs[2] = dom.createAttrMorph(element3, 'onclick');
        morphs[3] = dom.createMorphAt(element3, 0, 0);
        morphs[4] = dom.createAttrMorph(element4, 'onclick');
        morphs[5] = dom.createMorphAt(element4, 0, 0);
        morphs[6] = dom.createMorphAt(dom.childAt(element5, [1]), 0, 0);
        morphs[7] = dom.createMorphAt(dom.childAt(element5, [3]), 1, 1);
        morphs[8] = dom.createMorphAt(element6, 1, 1);
        morphs[9] = dom.createMorphAt(element6, 3, 3);
        morphs[10] = dom.createMorphAt(element7, 1, 1);
        morphs[11] = dom.createMorphAt(element7, 3, 3);
        morphs[12] = dom.createMorphAt(element8, 1, 1);
        morphs[13] = dom.createMorphAt(element8, 3, 3);
        morphs[14] = dom.createAttrMorph(element9, 'class');
        morphs[15] = dom.createMorphAt(element9, 1, 1);
        morphs[16] = dom.createMorphAt(element0, 5, 5);
        return morphs;
      },
      statements: [["inline", "t", ["section.options.storage.import_export.header"], [], ["loc", [null, [3, 23], [3, 75]]], 0, 0], ["inline", "t", ["section.options.storage.import_export.hint"], [], ["loc", [null, [4, 18], [4, 68]]], 0, 0], ["attribute", "onclick", ["subexpr", "action", ["exportData"], [], ["loc", [null, [null, null], [7, 61]]], 0, 0], 0, 0, 0, 0], ["inline", "t", ["section.options.storage.import_export.export"], [], ["loc", [null, [7, 62], [7, 114]]], 0, 0], ["attribute", "onclick", ["subexpr", "action", ["importDataPressed"], [], ["loc", [null, [null, null], [10, 71]]], 0, 0], 0, 0, 0, 0], ["inline", "t", ["section.options.storage.import_export.import"], [], ["loc", [null, [10, 72], [10, 124]]], 0, 0], ["inline", "t", ["section.options.storage.delete.header"], [], ["loc", [null, [16, 23], [16, 68]]], 0, 0], ["inline", "t", ["section.options.storage.delete.paragraph"], [], ["loc", [null, [18, 3], [18, 51]]], 0, 0], ["inline", "input", [], ["type", "checkbox", "checked", ["subexpr", "@mut", [["get", "confirm1", ["loc", [null, [24, 37], [24, 45]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [24, 5], [24, 47]]], 0, 0], ["inline", "t", ["section.options.storage.delete.checkbox1"], [], ["loc", [null, [25, 5], [25, 53]]], 0, 0], ["inline", "input", [], ["type", "checkbox", "checked", ["subexpr", "@mut", [["get", "confirm2", ["loc", [null, [32, 37], [32, 45]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [32, 5], [32, 47]]], 0, 0], ["inline", "t", ["section.options.storage.delete.checkbox2"], [], ["loc", [null, [33, 5], [33, 53]]], 0, 0], ["inline", "input", [], ["type", "checkbox", "checked", ["subexpr", "@mut", [["get", "confirm3", ["loc", [null, [40, 37], [40, 45]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [40, 5], [40, 47]]], 0, 0], ["inline", "t", ["section.options.storage.delete.checkbox3"], [], ["loc", [null, [41, 5], [41, 53]]], 0, 0], ["attribute", "class", ["concat", ["indexes ", ["subexpr", "if", [["get", "isAllConfirmed", ["loc", [null, [46, 26], [46, 40]]], 0, 0, 0, 0], "show"], [], ["loc", [null, [46, 21], [46, 49]]], 0, 0]], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["block", "each", [["get", "model", ["loc", [null, [47, 11], [47, 16]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [47, 3], [53, 12]]]], ["inline", "options/import-data", [], ["isVisible", ["subexpr", "@mut", [["get", "showImportModal", ["loc", [null, [57, 33], [57, 48]]], 0, 0, 0, 0]], [], [], 0, 0], "onImport", ["subexpr", "action", ["importData"], [], ["loc", [null, [57, 58], [57, 79]]], 0, 0], "onCancel", ["subexpr", "action", ["importCancelled"], [], ["loc", [null, [57, 89], [57, 115]]], 0, 0]], ["loc", [null, [57, 1], [57, 117]]], 0, 0]],
      locals: [],
      templates: [child0]
    };
  }());
});
define("micro-expense-tracker/templates/summary", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template(function () {
    var child0 = function () {
      var child0 = function () {
        return {
          meta: {
            "revision": "Ember@2.9.1",
            "loc": {
              "source": null,
              "start": {
                "line": 12,
                "column": 5
              },
              "end": {
                "line": 16,
                "column": 5
              }
            },
            "moduleName": "micro-expense-tracker/templates/summary.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("						");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("i");
            dom.setAttribute(el1, "class", "fa fa-filter fa-lg");
            dom.setAttribute(el1, "aria-hidden", "true");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      }();
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 2
            },
            "end": {
              "line": 25,
              "column": 2
            }
          },
          "moduleName": "micro-expense-tracker/templates/summary.hbs"
        },
        isEmpty: false,
        arity: 2,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("			");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("tr");
          var el2 = dom.createTextNode("\n				");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          dom.setAttribute(el2, "class", "category");
          var el3 = dom.createTextNode("\n					");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("				");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n				");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          dom.setAttribute(el2, "class", "value");
          var el3 = dom.createTextNode("\n					");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n				");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n				");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          dom.setAttribute(el2, "class", "percent");
          var el3 = dom.createTextNode("\n					");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n				");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n			");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var element2 = dom.childAt(element1, [1]);
          var morphs = new Array(5);
          morphs[0] = dom.createAttrMorph(element1, 'class');
          morphs[1] = dom.createUnsafeMorphAt(element2, 1, 1);
          morphs[2] = dom.createMorphAt(element2, 3, 3);
          morphs[3] = dom.createMorphAt(dom.childAt(element1, [3]), 1, 1);
          morphs[4] = dom.createMorphAt(dom.childAt(element1, [5]), 1, 1);
          return morphs;
        },
        statements: [["attribute", "class", ["concat", [["subexpr", "if", [["get", "data.category.hasChildren", ["loc", [null, [8, 19], [8, 44]]], 0, 0, 0, 0], "has-children", "no-children"], [], ["loc", [null, [8, 14], [8, 75]]], 0, 0]], 0, 0, 0, 0, 0], 0, 0, 0, 0], ["content", "data.category.namePathForHtml", ["loc", [null, [10, 5], [10, 40]]], 0, 0, 0, 0], ["block", "link-to", ["expenses.index", ["subexpr", "query-params", [], ["filter-category-id", ["get", "data.category.id", ["loc", [null, [13, 48], [13, 64]]], 0, 0, 0, 0]], ["loc", [null, [13, 15], [13, 65]]], 0, 0]], ["title", ["subexpr", "t", ["section.summary.filter_by_category"], [], ["loc", [null, [14, 21], [14, 61]]], 0, 0]], 0, null, ["loc", [null, [12, 5], [16, 17]]]], ["inline", "currency-format", [["get", "data.sum", ["loc", [null, [19, 23], [19, 31]]], 0, 0, 0, 0]], [], ["loc", [null, [19, 5], [19, 33]]], 0, 0], ["inline", "percent-format", [["get", "data.percentFraction", ["loc", [null, [22, 22], [22, 42]]], 0, 0, 0, 0]], ["isFraction", true], ["loc", [null, [22, 5], [22, 60]]], 0, 0]],
        locals: ["key", "data"],
        templates: [child0]
      };
    }();
    var child1 = function () {
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 26,
              "column": 2
            },
            "end": {
              "line": 32,
              "column": 2
            }
          },
          "moduleName": "micro-expense-tracker/templates/summary.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("			");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("tr");
          dom.setAttribute(el1, "class", "no-category");
          var el2 = dom.createTextNode("\n				");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("th");
          dom.setAttribute(el2, "class", "category");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n				");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          dom.setAttribute(el2, "class", "value");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n				");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n			");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 0, 0);
          morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]), 0, 0);
          return morphs;
        },
        statements: [["inline", "t", ["section.summary.no_category"], [], ["loc", [null, [28, 25], [28, 60]]], 0, 0], ["inline", "currency-format", [["get", "uncategorizedSum", ["loc", [null, [29, 40], [29, 56]]], 0, 0, 0, 0]], [], ["loc", [null, [29, 22], [29, 58]]], 0, 0]],
        locals: [],
        templates: []
      };
    }();
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 39,
            "column": 6
          }
        },
        "moduleName": "micro-expense-tracker/templates/summary.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "expenses-summary");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h1");
        dom.setAttribute(el2, "class", "container title");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("table");
        dom.setAttribute(el2, "class", "summary");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("tr");
        dom.setAttribute(el3, "class", "sum");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        dom.setAttribute(el4, "class", "category");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.setAttribute(el4, "class", "value");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("td");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element3 = dom.childAt(fragment, [0]);
        var element4 = dom.childAt(element3, [3]);
        var element5 = dom.childAt(element4, [4]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(element3, [1]), 1, 1);
        morphs[1] = dom.createMorphAt(element4, 1, 1);
        morphs[2] = dom.createMorphAt(element4, 2, 2);
        morphs[3] = dom.createMorphAt(dom.childAt(element5, [1]), 0, 0);
        morphs[4] = dom.createMorphAt(dom.childAt(element5, [3]), 0, 0);
        return morphs;
      },
      statements: [["inline", "t", ["section.summary.title"], [], ["loc", [null, [3, 2], [3, 31]]], 0, 0], ["block", "each-in", [["get", "expensesPerCategory", ["loc", [null, [7, 13], [7, 32]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [7, 2], [25, 14]]]], ["block", "if", [["get", "uncategorizedSum", ["loc", [null, [26, 8], [26, 24]]], 0, 0, 0, 0]], [], 1, null, ["loc", [null, [26, 2], [32, 9]]]], ["inline", "t", ["section.summary.total"], [], ["loc", [null, [34, 24], [34, 53]]], 0, 0], ["inline", "currency-format", [["get", "totalSum", ["loc", [null, [35, 39], [35, 47]]], 0, 0, 0, 0]], [], ["loc", [null, [35, 21], [35, 49]]], 0, 0]],
      locals: [],
      templates: [child0, child1]
    };
  }());
});
define('micro-expense-tracker/utils/i18n/compile-template', ['exports', 'ember-i18n/utils/i18n/compile-template'], function (exports, _compileTemplate) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _compileTemplate.default;
    }
  });
});
define('micro-expense-tracker/utils/i18n/missing-message', ['exports', 'ember-i18n/utils/i18n/missing-message'], function (exports, _missingMessage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _missingMessage.default;
    }
  });
});
define('micro-expense-tracker/utils/pad', ['exports', 'ember-pad/utils/pad'], function (exports, _pad) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _pad.default;
    }
  });
  Object.defineProperty(exports, 'padStart', {
    enumerable: true,
    get: function () {
      return _pad.padStart;
    }
  });
  Object.defineProperty(exports, 'padEnd', {
    enumerable: true,
    get: function () {
      return _pad.padEnd;
    }
  });
  Object.defineProperty(exports, 'padTpl', {
    enumerable: true,
    get: function () {
      return _pad.padTpl;
    }
  });
  Object.defineProperty(exports, 'padStartTpl', {
    enumerable: true,
    get: function () {
      return _pad.padStartTpl;
    }
  });
  Object.defineProperty(exports, 'padEndTpl', {
    enumerable: true,
    get: function () {
      return _pad.padEndTpl;
    }
  });
});


define('micro-expense-tracker/config/environment', ['ember'], function(Ember) {
  var prefix = 'micro-expense-tracker';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("micro-expense-tracker/app")["default"].create({"name":"micro-expense-tracker","version":"1.0.0+a7955b2c"});
}
//# sourceMappingURL=micro-expense-tracker.map
