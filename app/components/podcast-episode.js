import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  init() {
    this._super(...arguments);
    this.set('currentTime', 0);
    this.set('feedbackLoop', 10);
  },
  currentTime: null,
  timeupdate(event) {
    this.set('currentTime', event.target.currentTime);
  },
  regionCreated(region) {
    if (!this.get('region')) {
      let reference = this.get('model').get('references').createRecord({
        episode: this.get('model')
        // timestamp: currentTime
      });
      this.set('reference', reference);
    }
    this.set('region', Ember.Object.create(region));
  },
  regionUpdated(region) {
    if (this.get('region')) {
      this.get('region').setProperties(region);
    }
  },
  deleteRegion() {
    if (this.get('region')) {
      let region = this.get('region');
      this.get('player').regions.list[region.get('id')].remove();
      this.setProperties({
        reference: null,
        region: null
      });
    }
  },
  save() {
    let reference = this.get('reference');
    let region = this.get('region');
    reference.setProperties({
      start: region.get('start'),
      end: region.get('end')
    });
    reference.save().then(() =>  {

      this.setProperties({
        reference: null,
        region: null
      });

      this.get('player').regions.list[region.get('id')].remove();
    });

    return false;
  }
});
