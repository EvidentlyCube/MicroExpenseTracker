import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
    categoryProvider: Ember.inject.service(),

    model(){
        return RSVP.hash({
            categories: this.get('categoryProvider').getAllSortedByPath()
        });
    }
});
