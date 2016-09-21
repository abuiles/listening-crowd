import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  start: DS.attr('number'),
  end: DS.attr('number'),
  // timestampPretty: Ember.computed('timestamp', {
  //   get() {
  //     return window.juration.stringify(
  //       this.get('timestamp'),
  //       {
  //         format: 'chrono'
  //       }
  //     );
  //   }
  // }).readOnly(),
  deltas: DS.attr(),
  episode: DS.belongsTo('episode'),
  user: DS.belongsTo('user')
});
