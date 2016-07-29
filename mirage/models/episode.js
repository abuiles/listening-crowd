import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  podcast: belongsTo(),
  references: hasMany()
});
