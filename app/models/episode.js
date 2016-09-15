import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
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
  waveform: DS.belongsTo('waveform'),
  annotations: DS.hasMany('annotations'),
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
  }).readOnly()
});
