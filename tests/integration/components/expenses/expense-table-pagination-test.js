import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('expenses/expense-table-pagination', 'Integration | Component | expenses/expense table pagination', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{expenses/expense-table-pagination}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#expenses/expense-table-pagination}}
      template block text
    {{/expenses/expense-table-pagination}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
