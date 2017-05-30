export default {
	app: {
		title: "MET - Mikrowydatnik",
		subtitle: "Super szybkie śledzenie budżetu domowego!",
		page_title: "[MET] Mikrowydatnik"
	},
	common: {
		currency_wrap: '~~PRICE~~ zł',
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
				receipt_date: "Data zakupu",
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
				currency_preview: "Podgląd",
			},
			storage: {
				import_export: {
					header: "Importuj/Exportuj",
					hint: "Zaimportowanie danych spowoduje usunięcie danych obecnie zapisanych w systemie! Proszę, zrób kopię zapasową.",
					import: "Importuj",
					export: "Exportuj",
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
