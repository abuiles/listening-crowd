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
  references: DS.hasMany('references'),
  groupedReferences: Ember.computed('refences.[]', {
    get() {
      return this.get('references').reduce(function(mem, item) {
        mem[item.get('kind')] = mem[item.get('kind')] || [];
        mem[item.get('kind')].push(item);

        return mem;
      }, {});
    }
  }).readOnly()
});
