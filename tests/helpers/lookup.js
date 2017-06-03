import Ember from 'ember';

export default Ember.Test.registerHelper('lookup', function(app, name) {
	return app.__container__.lookup(name);
});
