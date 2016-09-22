import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  slug: DS.attr('string'),
  title: DS.attr('string'),
  pubDate: DS.attr('string'),
  description: DS.attr('string'),
  summary: DS.attr('string'),
  itunesSubtitle: DS.attr('string'),
  itunesKeywords: DS.attr('string'),
  enclosure: DS.attr(),
  itunesDuration: DS.attr(),
  itunesExplicit: DS.attr('string'),
  guid: DS.attr(),
  podcast: DS.belongsTo('podcast'),
  annotations: DS.hasMany('annotations'),
  permalink: Ember.computed('id', 'slug', {
    get() {
      return `${this.get('id')}-${this.get('slug')}`;
    }
  }).readOnly(),
  groupedAnnotations: Ember.computed('annotations.[]', {
    get() {
      return {};
    }
  }).readOnly(),
  podzyUrl: Ember.computed('enclosure.url', {
    get() {
      let url = this.get('enclosure.url');
      return `https://podzy.herokuapp.com/${url}`;
    }
  }).readOnly(),
  waveformDataUrl: Ember.computed('slug', 'podcast.slug', {
    get() {
      let podcastSlug = this.get('podcast.slug');
      let slug = this.get('slug');
      return `https://cdn.listeningcrowd.com/waveforms/${podcastSlug}/${slug}/waveform`;
    }
  }).readOnly(),
  waveformImage: Ember.computed('slug', 'podcast.slug', {
    get() {
      let podcastSlug = this.get('podcast.slug');
      let slug = this.get('slug');
      return `https://cdn.listeningcrowd.com/waveforms/${podcastSlug}/${slug}/waveform.png`;
    }
  }).readOnly()
});
