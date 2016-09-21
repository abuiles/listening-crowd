import DS from 'ember-data';

export default DS.Model.extend({
  annotations: DS.hasMany('annotation')
});
