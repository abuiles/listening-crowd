import DS from 'ember-data';
import Ember from 'ember';
import HasManyQuery from 'ember-data-has-many-query';

export default DS.Model.extend(HasManyQuery.ModelMixin, {
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
