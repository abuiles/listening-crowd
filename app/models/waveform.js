import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  episode: DS.belongsTo('episode'),
  sampleRate: DS.attr('number'),
  samplesPerPixel: DS.attr('number'),
  bits: DS.attr('number'),
  length: DS.attr('number'),
  waveformData: DS.attr(),
  points: Ember.computed('waveformData.[]', {
    get() {
      // https://github.com/katspaugh/wavesurfer.js/issues/715

      let data = this.get('waveformData') || [];
      return data.filter(function(point) {
        return point >= 0;
      });
    }
  }).readOnly()
});
