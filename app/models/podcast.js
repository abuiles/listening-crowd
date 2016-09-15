import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  title: DS.attr('string'),
  link: DS.attr('string'),
  description: DS.attr('string'),
  itunesCategories: DS.attr(),
  itunesImage: DS.attr('string'),
  copyright: DS.attr('string'),
  itunesAuthor: DS.attr('string'),
  itunesSubtitle: DS.attr('string'),
  itunesOwner: DS.attr(),
  episodes: DS.hasMany('episode'),
  slug: DS.attr('string'),
  permalink: Ember.computed('id', 'slug', {
    get() {
      return `${this.get('id')}-${this.get('slug')}`;
    }
  }).readOnly()
});
