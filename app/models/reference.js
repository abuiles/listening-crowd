import DS from 'ember-data';

export default DS.Model.extend({
  kind: DS.attr('string'),
  url: DS.attr('string'),
  summary : DS.attr('string'),
  episode: DS.belongsTo('episode')
});
