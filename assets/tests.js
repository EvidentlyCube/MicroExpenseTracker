'use strict';

define("micro-expense-tracker/tests/acceptance/category-workflow-test", ["qunit", "ember-native-dom-helpers", "micro-expense-tracker/tests/helpers/module-for-acceptance", "micro-expense-tracker/tests/helpers/acceptance-helpers/collection"], function (_qunit, _emberNativeDomHelpers, _moduleForAcceptance, _collection) {
	"use strict";

	_emberNativeDomHelpers.settings.rootElement = '#met-application';

	(0, _moduleForAcceptance.default)('Acceptance | category workflow', {
		beforeEach: function beforeEach() {
			localStorage.clear();
		}
	});

	var CategoryNameFirst = "Test category";
	var CategoryNameSecond = "Renamed category";

	(0, _qunit.test)('Asserting category workflow: create -> edit -> delete', function (assert) {
		_collection.default.install.skipInstall(this);

		andThen(function () {
			assert.equal(currentURL(), '/categories', 'We are in categories.index after going through install screen');
			assert.equal((0, _emberNativeDomHelpers.findAll)('.category-row').length, 0, 'There are no categories yet');
		});

		var category = _collection.default.category.addCategory(CategoryNameFirst, null, assert, this);

		andThen(function () {
			assert.equal(currentURL(), '/categories', 'We are in categories.index after creating category');
			assert.equal((0, _emberNativeDomHelpers.findAll)('.category-row').length, 1, 'There is one category in the list');

			click(".action-edit");
		});

		andThen(function () {
			assert.equal(currentURL(), "/categories/edit/" + category.v.id, 'We are editing the created category');
			assert.equal((0, _emberNativeDomHelpers.find)('.category-id').getAttribute('value'), category.v.id, "The hidden ID field is set to the category's id");

			fillIn('.name-input', CategoryNameSecond);
			click('.action-save');
		});

		andThen(function () {
			assert.equal(currentURL(), '/categories', "We are in categories.index after saving edit");
			assert.equal((0, _emberNativeDomHelpers.findAll)('.category-row').length, 1, 'There is still one category');

			var categoryRow = (0, _emberNativeDomHelpers.find)(".category-row-" + category.v.id);
			assert.ok(!!categoryRow, "We have found the category we've previously edited");

			var name = (0, _emberNativeDomHelpers.find)('.category-name', categoryRow).innerHTML;

			assert.ok(name.indexOf(CategoryNameFirst) === -1, "Old name is not displayed");
			assert.ok(name.indexOf(CategoryNameSecond) >= 0, "New name is displayed");

			click('.action-remove', categoryRow);
		});
		andThen(function () {
			assert.equal(currentURL(), '/categories', 'We are in categories.index after removing category');
			assert.equal((0, _emberNativeDomHelpers.findAll)('.category-row').length, 0, "No categories can be found");
		});
	});
});
define('micro-expense-tracker/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('components/categories/category-index-row.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/categories/category-index-row.js should pass ESLint\n\n');
  });

  QUnit.test('components/category-editor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/category-editor.js should pass ESLint\n\n');
  });

  QUnit.test('components/common/button-bar.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/common/button-bar.js should pass ESLint\n\n');
  });

  QUnit.test('components/common/danger-button.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/common/danger-button.js should pass ESLint\n\n');
  });

  QUnit.test('components/date-switcher.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/date-switcher.js should pass ESLint\n\n');
  });

  QUnit.test('components/expenses-editor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/expenses-editor.js should pass ESLint\n\n');
  });

  QUnit.test('components/global-notifications.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/global-notifications.js should pass ESLint\n\n');
  });

  QUnit.test('components/options/import-data.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/options/import-data.js should pass ESLint\n\n');
  });

  QUnit.test('components/select-input.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/select-input.js should pass ESLint\n\n');
  });

  QUnit.test('constants/options/language-options.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'constants/options/language-options.js should pass ESLint\n\n');
  });

  QUnit.test('constants/options/option-names.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'constants/options/option-names.js should pass ESLint\n\n');
  });

  QUnit.test('constants/storage/key-names.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'constants/storage/key-names.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/categories/edit.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/categories/edit.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/categories/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/categories/index.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/categories/new.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/categories/new.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/expenses/edit.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/expenses/edit.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/expenses/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/expenses/index.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/expenses/receipt.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/expenses/receipt.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/install.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/install.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/options/language.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/options/language.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/options/storage.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/options/storage.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/summary.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/summary.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/currency-format.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/currency-format.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/date-format.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/date-format.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/percent-format.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/percent-format.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/slugify.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/slugify.js should pass ESLint\n\n');
  });

  QUnit.test('initializers/register-model.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'initializers/register-model.js should pass ESLint\n\n');
  });

  QUnit.test('locales/en/config.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'locales/en/config.js should pass ESLint\n\n');
  });

  QUnit.test('locales/en/translations.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'locales/en/translations.js should pass ESLint\n\n');
  });

  QUnit.test('locales/pl/config.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'locales/pl/config.js should pass ESLint\n\n');
  });

  QUnit.test('locales/pl/translations.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'locales/pl/translations.js should pass ESLint\n\n');
  });

  QUnit.test('models/base-model.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/base-model.js should pass ESLint\n\n');
  });

  QUnit.test('models/category.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/category.js should pass ESLint\n\n');
  });

  QUnit.test('models/expense.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/expense.js should pass ESLint\n\n');
  });

  QUnit.test('models/month.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/month.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass ESLint\n\n');
  });

  QUnit.test('routes/categories.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/categories.js should pass ESLint\n\n');
  });

  QUnit.test('routes/categories/edit.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/categories/edit.js should pass ESLint\n\n');
  });

  QUnit.test('routes/categories/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/categories/index.js should pass ESLint\n\n');
  });

  QUnit.test('routes/categories/new.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/categories/new.js should pass ESLint\n\n');
  });

  QUnit.test('routes/expenses.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/expenses.js should pass ESLint\n\n');
  });

  QUnit.test('routes/expenses/edit.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/expenses/edit.js should pass ESLint\n\n');
  });

  QUnit.test('routes/expenses/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/expenses/index.js should pass ESLint\n\n');
  });

  QUnit.test('routes/expenses/new.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/expenses/new.js should pass ESLint\n\n');
  });

  QUnit.test('routes/expenses/receipt.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/expenses/receipt.js should pass ESLint\n\n');
  });

  QUnit.test('routes/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass ESLint\n\n');
  });

  QUnit.test('routes/install.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/install.js should pass ESLint\n\n');
  });

  QUnit.test('routes/options.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/options.js should pass ESLint\n\n');
  });

  QUnit.test('routes/options/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/options/index.js should pass ESLint\n\n');
  });

  QUnit.test('routes/options/language.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/options/language.js should pass ESLint\n\n');
  });

  QUnit.test('routes/options/misc.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/options/misc.js should pass ESLint\n\n');
  });

  QUnit.test('routes/options/storage.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/options/storage.js should pass ESLint\n\n');
  });

  QUnit.test('routes/summary.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/summary.js should pass ESLint\n\n');
  });

  QUnit.test('services/category-provider.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/category-provider.js should pass ESLint\n\n');
  });

  QUnit.test('services/dao/dao-category.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/dao/dao-category.js should pass ESLint\n\n');
  });

  QUnit.test('services/dao/dao-expense.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/dao/dao-expense.js should pass ESLint\n\n');
  });

  QUnit.test('services/dao/model-daos.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/dao/model-daos.js should pass ESLint\n\n');
  });

  QUnit.test('services/expense/model-saver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/expense/model-saver.js should pass ESLint\n\n');
  });

  QUnit.test('services/expense/model-utils.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/expense/model-utils.js should pass ESLint\n\n');
  });

  QUnit.test('services/expense/model-validator.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/expense/model-validator.js should pass ESLint\n\n');
  });

  QUnit.test('services/global-notification-storage.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/global-notification-storage.js should pass ESLint\n\n');
  });

  QUnit.test('services/months-service.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/months-service.js should pass ESLint\n\n');
  });

  QUnit.test('services/options-service.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/options-service.js should pass ESLint\n\n');
  });

  QUnit.test('services/sanitizer.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/sanitizer.js should pass ESLint\n\n');
  });

  QUnit.test('services/shims/downloadjs-shim.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/shims/downloadjs-shim.js should pass ESLint\n\n5:3 - \'download\' is not defined. (no-undef)');
  });

  QUnit.test('services/storage/permanent-storage-index.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/storage/permanent-storage-index.js should pass ESLint\n\n86:4 - Unexpected console statement. (no-console)');
  });

  QUnit.test('services/storage/permanent-storage-local-storage.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/storage/permanent-storage-local-storage.js should pass ESLint\n\n');
  });

  QUnit.test('services/storage/permanent-storage-nw-file.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/storage/permanent-storage-nw-file.js should pass ESLint\n\n');
  });

  QUnit.test('services/storage/permanent-storage-service.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/storage/permanent-storage-service.js should pass ESLint\n\n');
  });

  QUnit.test('services/summary-service.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/summary-service.js should pass ESLint\n\n');
  });
});
define('micro-expense-tracker/tests/assertions', ['exports', 'ember', 'micro-expense-tracker/config/environment'], function (exports, _ember, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.assertionCleanup = exports.assertionInjector = undefined;
  var camelize = _ember.default.String.camelize;


  var assertionCache = void 0;

  function assertions() {
    if (!assertionCache) {
      var modulePrefix = _environment.default.modulePrefix;

      var entries = _ember.default.A(Object.keys(requirejs.entries));
      var pattern = new RegExp('^' + modulePrefix + '/tests/assertions/[\\w-]+$');

      assertionCache = entries.reduce(function (entries, entry) {
        if (entry.match(pattern)) {
          var splitEntry = entry.split('/');
          var fn = requirejs(entry)['default'];

          entry = splitEntry[splitEntry.length - 1];
          entry = camelize(entry);
          entries[entry] = fn;
        }

        return entries;
      }, {});
    }

    return assertionCache;
  }

  function assertionInjector(context) {
    var _assertions = assertions();

    Object.keys(_assertions).forEach(function (assertion) {
      window.QUnit.assert[assertion] = function () {
        var fn = _assertions[assertion];
        var args = Array.prototype.slice.call(arguments);

        if (context) {
          args.unshift(context);
        }

        return fn.apply(this, args);
      };
    });
  }

  function assertionCleanup() {
    var _assertions = assertions();

    Object.keys(_assertions).forEach(function (assertion) {
      delete window.QUnit.assert[assertions];
    });
  }

  exports.assertionInjector = assertionInjector;
  exports.assertionCleanup = assertionCleanup;
});
define('micro-expense-tracker/tests/helpers/acceptance-helpers/category/add-category', ['exports', 'ember-native-dom-helpers'], function (exports, _emberNativeDomHelpers) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	exports.default = function (categoryName, parentId, assert, context) {
		return function () {
			var value = {
				id: 0,
				name: categoryName,
				parentId: parentId
			};
			var returnObject = { v: value };

			visit('/categories');
			click('.action-new-category');

			andThen(function () {
				assert.equal(currentURL(), '/categories/new', 'We are in categories.new');
				fillIn('.name-input', categoryName);
				click('.action-save');
			});

			andThen(function () {
				var categories = Array.from((0, _emberNativeDomHelpers.findAll)('.category-row'));

				categories.forEach(function (category) {
					var id = parseInt(category.getAttribute('data-id'));

					value.id = Math.max(value.id, id);
				});
			});

			return returnObject;
		}.call(context);
	};
});
define("micro-expense-tracker/tests/helpers/acceptance-helpers/collection", ["exports", "micro-expense-tracker/tests/helpers/acceptance-helpers/install/skip-install", "micro-expense-tracker/tests/helpers/acceptance-helpers/category/add-category"], function (exports, _skipInstall, _addCategory) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		install: {
			skipInstall: _skipInstall.default
		},
		category: {
			addCategory: _addCategory.default
		}
	};
});
define('micro-expense-tracker/tests/helpers/acceptance-helpers/install/skip-install', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	exports.default = function (context) {
		(function () {
			visit('/install');
			click('.install-route .start-button');
		}).call(context);
	};
});
define('micro-expense-tracker/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  function destroyApp(application) {
    _ember.default.run(application, 'destroy');
  }
});
define('micro-expense-tracker/tests/helpers/ember-basic-dropdown', ['exports', 'ember', 'ember-runloop', 'ember-native-dom-helpers', 'ember-test-helpers/wait'], function (exports, _ember, _emberRunloop, _emberNativeDomHelpers, _wait) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.nativeClick = undefined;
  exports.nativeTap = nativeTap;
  exports.clickTrigger = clickTrigger;
  exports.tapTrigger = tapTrigger;
  exports.fireKeydown = fireKeydown;

  exports.default = function () {
    _ember.default.Test.registerAsyncHelper('clickDropdown', function (app, cssPath) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      clickTrigger(cssPath, options);
    });

    _ember.default.Test.registerAsyncHelper('tapDropdown', function (app, cssPath) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      tapTrigger(cssPath, options);
    });
  };

  var nativeClick = exports.nativeClick = _emberNativeDomHelpers.click;
  var merge = _ember.default.merge;
  function nativeTap(selector) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var touchStartEvent = new window.Event('touchstart', { bubbles: true, cancelable: true, view: window });
    Object.keys(options).forEach(function (key) {
      return touchStartEvent[key] = options[key];
    });
    (0, _emberRunloop.default)(function () {
      return document.querySelector(selector).dispatchEvent(touchStartEvent);
    });
    var touchEndEvent = new window.Event('touchend', { bubbles: true, cancelable: true, view: window });
    Object.keys(options).forEach(function (key) {
      return touchEndEvent[key] = options[key];
    });
    (0, _emberRunloop.default)(function () {
      return document.querySelector(selector).dispatchEvent(touchEndEvent);
    });
  }

  function clickTrigger(scope) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var selector = '.ember-basic-dropdown-trigger';
    if (scope) {
      var element = document.querySelector(scope);
      if (element.classList.contains('ember-basic-dropdown-trigger')) {
        selector = scope;
      } else {
        selector = scope + ' ' + selector;
      }
    }
    (0, _emberNativeDomHelpers.click)(selector, options);
    return (0, _wait.default)();
  }

  function tapTrigger(scope) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var selector = '.ember-basic-dropdown-trigger';
    if (scope) {
      selector = scope + ' ' + selector;
    }
    nativeTap(selector, options);
  }

  function fireKeydown(selector, k) {
    var oEvent = document.createEvent('Events');
    oEvent.initEvent('keydown', true, true);
    merge(oEvent, {
      view: window,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      keyCode: k,
      charCode: k
    });
    (0, _emberRunloop.default)(function () {
      return document.querySelector(selector).dispatchEvent(oEvent);
    });
  }

  // acceptance helpers
});
define('micro-expense-tracker/tests/helpers/ember-i18n/test-helpers', ['ember'], function (_ember) {
  'use strict';

  // example usage: find(`.header:contains(${t('welcome_message')})`)
  _ember.default.Test.registerHelper('t', function (app, key, interpolations) {
    var i18n = app.__container__.lookup('service:i18n');
    return i18n.t(key, interpolations);
  });

  // example usage: expectTranslation('.header', 'welcome_message');
  _ember.default.Test.registerHelper('expectTranslation', function (app, element, key, interpolations) {
    var text = app.testHelpers.t(key, interpolations);

    assertTranslation(element, key, text);
  });

  var assertTranslation = function () {
    if (typeof QUnit !== 'undefined' && typeof QUnit.assert.ok === 'function') {
      return function (element, key, text) {
        QUnit.assert.ok(find(element + ':contains(' + text + ')').length, 'Found translation key ' + key + ' in ' + element);
      };
    } else if (typeof expect === 'function') {
      return function (element, key, text) {
        var found = !!find(element + ':contains(' + text + ')').length;
        expect(found).to.equal(true);
      };
    } else {
      return function () {
        throw new Error("ember-i18n could not find a compatible test framework");
      };
    }
  }();
});
define('micro-expense-tracker/tests/helpers/ember-power-select', ['exports', 'ember', 'ember-test', 'ember-test-helpers/wait', 'ember-native-dom-helpers'], function (exports, _ember, _emberTest, _wait, _emberNativeDomHelpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.selectChoose = undefined;
  exports.findContains = findContains;
  exports.nativeMouseDown = nativeMouseDown;
  exports.nativeMouseUp = nativeMouseUp;
  exports.triggerKeydown = triggerKeydown;
  exports.typeInSearch = typeInSearch;
  exports.clickTrigger = clickTrigger;
  exports.nativeTouch = nativeTouch;
  exports.touchTrigger = touchTrigger;

  exports.default = function () {
    _emberTest.default.registerAsyncHelper('selectChoose', function (_, cssPathOrTrigger, valueOrSelector, optionIndex) {
      return selectChoose(cssPathOrTrigger, valueOrSelector, optionIndex);
    });

    _emberTest.default.registerAsyncHelper('selectSearch', function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(app, cssPathOrTrigger, value) {
        var trigger, triggerPath, contentId, isMultipleSelect, content, dropdownIsClosed, isDefaultSingleSelect, inputIsInTrigger;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                trigger = void 0;

                if (!(cssPathOrTrigger instanceof HTMLElement)) {
                  _context2.next = 5;
                  break;
                }

                trigger = cssPathOrTrigger;
                _context2.next = 10;
                break;

              case 5:
                triggerPath = cssPathOrTrigger + ' .ember-power-select-trigger';

                trigger = (0, _emberNativeDomHelpers.find)(triggerPath);
                if (!trigger) {
                  triggerPath = cssPathOrTrigger;
                  trigger = (0, _emberNativeDomHelpers.find)(triggerPath);
                }

                if (trigger) {
                  _context2.next = 10;
                  break;
                }

                throw new Error('You called "selectSearch(\'' + cssPathOrTrigger + '\', \'' + value + '\')" but no select was found using selector "' + cssPathOrTrigger + '"');

              case 10:
                contentId = '' + trigger.attributes['aria-owns'].value;
                isMultipleSelect = !!(0, _emberNativeDomHelpers.find)('.ember-power-select-trigger-multiple-input', trigger);
                content = (0, _emberNativeDomHelpers.find)('#' + contentId);
                dropdownIsClosed = !content || content.classList.contains('ember-basic-dropdown-content-placeholder');

                if (!dropdownIsClosed) {
                  _context2.next = 19;
                  break;
                }

                _context2.next = 17;
                return (0, _emberNativeDomHelpers.click)(trigger);

              case 17:
                _context2.next = 19;
                return (0, _wait.default)();

              case 19:
                isDefaultSingleSelect = !!(0, _emberNativeDomHelpers.find)('.ember-power-select-search-input');

                if (!isMultipleSelect) {
                  _context2.next = 25;
                  break;
                }

                _context2.next = 23;
                return (0, _emberNativeDomHelpers.fillIn)((0, _emberNativeDomHelpers.find)('.ember-power-select-trigger-multiple-input', trigger), value);

              case 23:
                _context2.next = 38;
                break;

              case 25:
                if (!isDefaultSingleSelect) {
                  _context2.next = 30;
                  break;
                }

                _context2.next = 28;
                return (0, _emberNativeDomHelpers.fillIn)('.ember-power-select-search-input', value);

              case 28:
                _context2.next = 38;
                break;

              case 30:
                // It's probably a customized version
                inputIsInTrigger = !!(0, _emberNativeDomHelpers.find)('.ember-power-select-trigger input[type=search]', trigger);

                if (!inputIsInTrigger) {
                  _context2.next = 36;
                  break;
                }

                _context2.next = 34;
                return (0, _emberNativeDomHelpers.fillIn)((0, _emberNativeDomHelpers.find)('input[type=search]', trigger), value);

              case 34:
                _context2.next = 38;
                break;

              case 36:
                _context2.next = 38;
                return (0, _emberNativeDomHelpers.fillIn)('#' + contentId + ' .ember-power-select-search-input[type=search]', 'input');

              case 38:
                return _context2.abrupt('return', (0, _wait.default)());

              case 39:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function (_x5, _x6, _x7) {
        return _ref2.apply(this, arguments);
      };
    }());

    _emberTest.default.registerAsyncHelper('removeMultipleOption', function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(app, cssPath, value) {
        var elem, items, item;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                elem = void 0;
                items = [].slice.apply((0, _emberNativeDomHelpers.findAll)(cssPath + ' .ember-power-select-multiple-options > li'));
                item = items.find(function (el) {
                  return el.textContent.indexOf(value) > -1;
                });

                if (item) {
                  elem = (0, _emberNativeDomHelpers.find)('.ember-power-select-multiple-remove-btn', item);
                }
                _context3.prev = 4;
                _context3.next = 7;
                return (0, _emberNativeDomHelpers.click)(elem);

              case 7:
                return _context3.abrupt('return', (0, _wait.default)());

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3['catch'](4);

                console.warn('css path to remove btn not found');
                throw _context3.t0;

              case 14:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[4, 10]]);
      }));

      return function (_x8, _x9, _x10) {
        return _ref3.apply(this, arguments);
      };
    }());

    _emberTest.default.registerAsyncHelper('clearSelected', function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(app, cssPath) {
        var elem;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                elem = (0, _emberNativeDomHelpers.find)(cssPath + ' .ember-power-select-clear-btn');
                _context4.prev = 1;
                _context4.next = 4;
                return (0, _emberNativeDomHelpers.click)(elem);

              case 4:
                return _context4.abrupt('return', (0, _wait.default)());

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4['catch'](1);

                console.warn('css path to clear btn not found');
                throw _context4.t0;

              case 11:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 7]]);
      }));

      return function (_x11, _x12) {
        return _ref4.apply(this, arguments);
      };
    }());
  };

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  /**
   * @private
   * @param {String} selector CSS3 selector of the elements to check the content
   * @param {String} text Substring that the selected element must contain
   * @returns HTMLElement The first element that maches the given selector and contains the
   *                      given text
   */
  function findContains(selector, text) {
    return [].slice.apply((0, _emberNativeDomHelpers.findAll)(selector)).filter(function (e) {
      return e.textContent.trim().indexOf(text) > -1;
    })[0];
  }

  function nativeMouseDown(selectorOrDomElement, options) {
    (0, _emberNativeDomHelpers.triggerEvent)(selectorOrDomElement, 'mousedown', options);
  }

  function nativeMouseUp(selectorOrDomElement, options) {
    (0, _emberNativeDomHelpers.triggerEvent)(selectorOrDomElement, 'mouseup', options);
  }

  function triggerKeydown(domElement, k) {
    (0, _emberNativeDomHelpers.keyEvent)(domElement, 'keydown', k);
  }

  function typeInSearch(scopeOrText, text) {
    var scope = '';

    if (typeof text === 'undefined') {
      text = scopeOrText;
    } else {
      scope = scopeOrText;
    }

    var selectors = ['.ember-power-select-search-input', '.ember-power-select-search input', '.ember-power-select-trigger-multiple-input', 'input[type="search"]'].map(function (selector) {
      return scope + ' ' + selector;
    }).join(', ');

    return (0, _emberNativeDomHelpers.fillIn)(selectors, text);
  }

  function clickTrigger(scope) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var selector = '.ember-power-select-trigger';
    if (scope) {
      selector = scope + ' ' + selector;
    }
    return (0, _emberNativeDomHelpers.click)(selector, options);
  }

  function nativeTouch(selectorOrDomElement) {
    (0, _emberNativeDomHelpers.triggerEvent)(selectorOrDomElement, 'touchstart');
    (0, _emberNativeDomHelpers.triggerEvent)(selectorOrDomElement, 'touchend');
  }

  function touchTrigger() {
    nativeTouch('.ember-power-select-trigger');
  }

  var selectChoose = exports.selectChoose = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(cssPathOrTrigger, valueOrSelector, optionIndex) {
      var trigger, target, contentId, content, options, potentialTargets, matchEq, index, option, filteredTargets;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              trigger = void 0, target = void 0;

              if (!(cssPathOrTrigger instanceof HTMLElement)) {
                _context.next = 5;
                break;
              }

              if (cssPathOrTrigger.classList.contains('ember-power-select-trigger')) {
                trigger = cssPathOrTrigger;
              } else {
                trigger = (0, _emberNativeDomHelpers.find)('.ember-power-select-trigger', cssPathOrTrigger);
              }
              _context.next = 9;
              break;

            case 5:
              trigger = (0, _emberNativeDomHelpers.find)(cssPathOrTrigger + ' .ember-power-select-trigger');

              if (!trigger) {
                trigger = (0, _emberNativeDomHelpers.find)(cssPathOrTrigger);
              }

              if (trigger) {
                _context.next = 9;
                break;
              }

              throw new Error('You called "selectChoose(\'' + cssPathOrTrigger + '\', \'' + valueOrSelector + '\')" but no select was found using selector "' + cssPathOrTrigger + '"');

            case 9:
              contentId = '' + trigger.attributes['aria-owns'].value;
              content = (0, _emberNativeDomHelpers.find)('#' + contentId);
              // If the dropdown is closed, open it

              if (!(!content || content.classList.contains('ember-basic-dropdown-content-placeholder'))) {
                _context.next = 16;
                break;
              }

              _context.next = 14;
              return (0, _emberNativeDomHelpers.click)(trigger);

            case 14:
              _context.next = 16;
              return (0, _wait.default)();

            case 16:

              // Select the option with the given text
              options = [].slice.apply((0, _emberNativeDomHelpers.findAll)('#' + contentId + ' .ember-power-select-option'));
              potentialTargets = options.filter(function (opt) {
                return opt.textContent.indexOf(valueOrSelector) > -1;
              });

              if (potentialTargets.length === 0) {
                // If treating the value as text doesn't gave use any result, let's try if it's a css selector
                matchEq = valueOrSelector.slice(-6).match(/:eq\((\d+)\)/);

                if (matchEq) {
                  index = parseInt(matchEq[1], 10);
                  option = (0, _emberNativeDomHelpers.findAll)('#' + contentId + ' ' + valueOrSelector.slice(0, -6))[index];

                  _ember.default.deprecate('Passing selectors with the `:eq()` pseudoselector is deprecated. If you want to select the nth option, pass a number as a third argument. E.g `selectChoose(".language-select", ".ember-power-select-option", 3)`', true, {
                    id: 'select-choose-no-eq-pseudoselector',
                    until: '1.8.0'
                  });
                  if (option) {
                    potentialTargets = [option];
                  }
                } else {
                  potentialTargets = (0, _emberNativeDomHelpers.findAll)('#' + contentId + ' ' + valueOrSelector);
                }
              }
              if (potentialTargets.length > 1) {
                filteredTargets = [].slice.apply(potentialTargets).filter(function (t) {
                  return t.textContent.trim() === valueOrSelector;
                });

                if (optionIndex === undefined) {
                  target = filteredTargets[0] || potentialTargets[0];
                } else {
                  target = filteredTargets[optionIndex] || potentialTargets[optionIndex];
                }
              } else {
                target = potentialTargets[0];
              }

              if (target) {
                _context.next = 22;
                break;
              }

              throw new Error('You called "selectChoose(\'' + cssPathOrTrigger + '\', \'' + valueOrSelector + '\')" but "' + valueOrSelector + '" didn\'t match any option');

            case 22:
              _context.next = 24;
              return (0, _emberNativeDomHelpers.click)(target);

            case 24:
              return _context.abrupt('return', (0, _wait.default)());

            case 25:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function selectChoose(_x2, _x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }();
});
define('micro-expense-tracker/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember', 'micro-expense-tracker/tests/helpers/start-app', 'micro-expense-tracker/tests/helpers/destroy-app'], function (exports, _qunit, _ember, _startApp, _destroyApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _startApp.default)();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },
      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _destroyApp.default)(_this.application);
        });
      }
    });
  };

  var Promise = _ember.default.RSVP.Promise;
});
define('micro-expense-tracker/tests/helpers/resolver', ['exports', 'micro-expense-tracker/resolver', 'micro-expense-tracker/config/environment'], function (exports, _resolver, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var resolver = _resolver.default.create();

  resolver.namespace = {
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix
  };

  exports.default = resolver;
});
define('micro-expense-tracker/tests/helpers/start-app', ['exports', 'ember', 'micro-expense-tracker/app', 'micro-expense-tracker/config/environment'], function (exports, _ember, _app, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startApp;
  function startApp(attrs) {
    var attributes = _ember.default.merge({}, _environment.default.APP);
    attributes = _ember.default.merge(attributes, attrs); // use defaults, but you can override;

    return _ember.default.run(function () {
      var application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('micro-expense-tracker/tests/integration/components/options/import-data-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('options/import-data', 'Integration | Component | options/import data', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template(function () {
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
              "column": 23
            }
          }
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
        statements: [["content", "options/import-data", ["loc", [null, [1, 0], [1, 23]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    }()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template(function () {
      var child0 = function () {
        return {
          meta: {
            "revision": "Ember@2.9.1",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 4
              },
              "end": {
                "line": 4,
                "column": 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      template block text\n");
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
              "line": 5,
              "column": 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["block", "options/import-data", [], [], 0, null, ["loc", [null, [2, 4], [4, 28]]]]],
        locals: [],
        templates: [child0]
      };
    }()));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('micro-expense-tracker/tests/test-helper', ['micro-expense-tracker/tests/helpers/resolver', 'ember-qunit', 'ember-cli-qunit'], function (_resolver, _emberQunit, _emberCliQunit) {
  'use strict';

  (0, _emberQunit.setResolver)(_resolver.default);
  (0, _emberCliQunit.start)();
});
define('micro-expense-tracker/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('acceptance/category-workflow-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/category-workflow-test.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/acceptance-helpers/category/add-category.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/acceptance-helpers/category/add-category.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/acceptance-helpers/collection.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/acceptance-helpers/collection.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/acceptance-helpers/install/skip-install.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/acceptance-helpers/install/skip-install.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/options/import-data-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/options/import-data-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });
});
require('micro-expense-tracker/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
