import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    price: DS.attr('number'),
    discount: DS.attr('number'),
    purchasedAt: DS.attr('date'),
    createdAt: DS.attr('date'),
    updatedAt: DS.attr('date'),


    category: DS.belongsTo('category'),

    realPrice: Ember.computed('price', 'discount', function(){
        return this.get('price') * (1 - this.get('discount'));
    }),
    discountDisplay: Ember.computed('discount', function(){
        return Math.round(this.get('discount') * 100) + "%";
    })
});
