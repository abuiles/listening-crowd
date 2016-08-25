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
  newReference(currentTime) {
    let reference = this.get('model').get('references').createRecord({
      episode: this.get('model'),
      timestamp: currentTime
    });
    this.set('reference', reference);
  }
});
