import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    parent: DS.belongsTo('category', {inverse: null, async: false}),

    indentedName: Ember.computed('name', 'parent', 'parent.name', 'parent.parent', function(){
        var parent = this.get('parent');

        var indent = "";

        while(parent){
            indent += "&nbsp;-&nbsp;";
            parent = parent.get('parent');
        }

        return indent + this.get('name');
    }),

    namePath: Ember.computed('name', 'parent', 'parent.parent', 'parent.namePath', function(){
        var parent = this.get('parent');

        if (parent){
            return parent.get('namePath') + " -> " + this.get('name');
        } else {
            return this.get('name');
        }
    }),

    namePathForHtml: Ember.computed('name', 'parent', 'parent.parent', 'parent.namePath', function(){
        var parent = this.get('parent');

        if (parent){
            return `${parent.get('namePath')} -> <strong>${this.get('name')}</strong>`;
        } else {
            return `<strong>${this.get('name')}</strong>`;
        }
    }),

    rootName: Ember.computed('name', 'parent', 'parent.parent', 'parent.name', 'parent.rootName', function(){
        var name = this.get('name');
        var parent = this.get('parent');

        while(parent){
            name = parent.get('name');
            parent = parent.get('parent');
        }

        return name;
    })
});
