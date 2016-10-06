import DS from 'ember-data';

export default DS.Model.extend({
  annotations: DS.hasMany('annotation'),
  annotationsCount: DS.attr('number'),
  username: DS.attr('string'),
  slug: DS.attr('string')
});
