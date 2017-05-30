export default {
	app: {
		title: "MET - Micro Expense Tracker",
		subtitle: "Track your daily expenses faster than you can type!",
		page_title: "[MET] Micro Expense Tracker"
	},
	common: {
		currency_wrap: '$~~PRICE~~',
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
				receipt_date: "Purchase date",
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
				currency_preview: "Preview",
			},
			storage: {
				import_export: {
					header: "Import/Export",
					hint: "Importing data will delete all the data you currently have in storage! It's advisable to first export a backup copy.",
					import: "Import",
					export: "Export",
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
