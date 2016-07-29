import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  pubDate: DS.attr('string'),
  itunesSubtitle: DS.attr('string'),
  description: DS.attr('string'),
  summary: DS.attr('string'),
  itunesSubtitle: DS.attr('string'),
  itunesKeywords: DS.attr('string'),
  enclosure: DS.attr(),
  itunesDuration: DS.attr(),
  itunesExplicit: DS.attr('string'),
  guid: DS.attr(),
  podcast: DS.belongsTo('podcast'),
  references: DS.hasMany('references')
});
