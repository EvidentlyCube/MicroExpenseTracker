import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('expenses/expense-table-row', 'Integration | Component | expenses/expense table row', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{expenses/expense-table-row}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#expenses/expense-table-row}}
      template block text
    {{/expenses/expense-table-row}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
