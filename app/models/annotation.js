import DS from 'ember-data';

export default DS.Model.extend({
  start: DS.attr('number'),
  end: DS.attr('number'),
  deltas: DS.attr(),
  episode: DS.belongsTo('episode'),
  user: DS.belongsTo('user')
});
