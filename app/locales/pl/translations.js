export default {
    app: {
        title: "Mikrowydatnik MET",
        subtitle: "Super szybkie śledzenie budżetu domowego!"
    },
    navigation:{
        main_menu: 'Menu główne:',
        categories: "Kategorie",
        summary: "Statystyki",
        expenses: "Wydatki"
    },
    footer: {
        made_by: 'Strona stworzona przez <a href="http://mauft.com">Maurycy Zarzycki Mauft.com</a>.',
        thanks: 'MET powstał w oparciu o <a href="http://emberjs.com/">Ember.js</a>, najlepszy silnik do jednostronowych aplikacji.',

        header_1: "Bezpieczeństwo i prywatnośc",
        header_2: "Przechowywanie danych",
        header_3: "Pomoc",

        body_1: "Mikrowydatnik MET został zaprojektwany tak, by nie wysyłać żadnych informacji przez internet, dzięki czemu w założeniach jest tak bezpieczny jak twoja przeglądarka i komputer. Dokłada wszelkich starań by nie dawać dostepu do zmiany plików projektu osobom trzecim. Niemniej jednak używając tego narzędzia robisz to na własną odpowiedzialność.",
        body_2: "Mikrowydatnik MET używa lokalnej pamięci przeglądarki by przechowywać dane, co powoduje, że można je dość łatwo utracić w niektórych przypadkach. Ponieważ projekt powstał głównie z potrzeby osobistej nie ma gwarancji, że kiedykolwiek powstaną inne mechanizmy.",
        body_3: "Jeżeli podoba ci się ten projekt i chcesz go wesprzeć lub masz pytania użyj proszę <a href='https://github.com/RetrocadeNet/MicroExpenseTracker/issues'>zgłaszania błędów</a> na GitHubie (wbrew nazwie można tam też zgłaszać pytania i nie tylko). Jeżeli potrzebujesz skontaktować się z autorem napisz na <a href='mailto:maurycy.zarzycki@mauft.com'>maurycy.zarzycki@mauft.com</a>"
    },
    section: {
        categories: {
            title: "Kategorie wydatków",

            index:{
                operations: "Operacje",
                add_new_category: "Dodaj nową kategorię",
                name_path: "Nazwa",
                actions: "Akcje",
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
                deleted: 'Kategoria "{{{name}}}" została usunięta.'
            }
        },

        expenses: {
            title: 'Wydatki',

            index:{
                operations: "Operacje",
                add_new_receipt: "Dodaj paragon",
                product: "Wydatek",
                final_price: "Koszt",
                missing_category: "&lt;bez kategorii&gt;",
                category: "Kategoria",
                expense_date: "Data wydatku",
                missing_expense_date: "&lt;brak daty&gt;",
                actions: "Akcje",
                action: {
                    edit: 'Edytuj wydatek "{{expense}}"',
                    delete: 'Usuń wydatek "{{expense}}"'
                }
            },

            new_receipt: {
                title: "Dodaj paragon",
                save: "Zapisz",
                cancel: "Anuluj",
                receipt_date: "Data paragonu",
                expenses: "Wydatki",
                name_placeholder: "Nazwa wydatku",
                price_placeholder: "Cena",
                category_placeholder: "Kategoria",
                discount_placeholder: "Rabat"
            },

            notifications: {
                created_receipt: 'Dodano paragon.',
                fix_form: 'Proimy poprawić błedy w formularzu.',
                deleted: 'Wydatek "{{{name}}}" został usunięty.'
            }
        }
    }
};
