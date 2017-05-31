import Ember from 'ember';
import diacritic from 'npm:diacritic';

export function slugify([text]) {
  if (typeof text === "undefined" || text === null || text === undefined){
    return 'n/a';
  }

  text = diacritic.clean(text);
  text = text.toLowerCase();
  text = text.replace(/[^a-z0-9-]+/g, '-');
  text = text.replace(/(^-+|-+$)/g, '');

  return text;
}

export default Ember.Helper.helper(slugify);
