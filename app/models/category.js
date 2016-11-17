import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    parent: DS.belongsTo('category', {inverse: 'parent'})
});
