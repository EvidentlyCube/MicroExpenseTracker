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
            path: 'categories/edit/:id'
        });
    });
    this.route('expenses', function () {
        this.route('index');
        this.route('new');

        this.route('edit', {
            path: 'expenses/edit/:id'
        });
    });
});

export default Router;
