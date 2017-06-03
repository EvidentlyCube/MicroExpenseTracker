import Ember from "ember";
import config from "./config/environment";

const Router = Ember.Router.extend({
    location: config.locationType,
    rootURL: config.rootURL
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

export default Router;
