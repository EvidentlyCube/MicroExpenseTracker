import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
    location: config.locationType,
    rootURL: config.rootURL
});

Router.map(function () {
  this.route('categories', function () {
      this.route('new');

      this.route('edit', {
          path: 'categories/edit/:category_id'
      });
  });
  this.route('expenses', function () {
    this.route('index');
    this.route('new');

    this.route('edit', {
        path: 'expenses/edit/:expense_id'
    });
    this.route('receipt');
  });
  this.route('summary', function() {});
});

export default Router;
