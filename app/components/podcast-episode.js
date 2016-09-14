import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  init() {
    this._super(...arguments);
    this.set('currentTime', 0);
    this.set('feedbackLoop', 10);
  },
  references: Ember.computed.filterBy('model.references', 'isNew', false),
  sortedReferences: Ember.computed.sort('references', function(a,b) {
    if (a.get('start') > b.get('start')) {
      return 1;
    } else if (a.get('start') < b.get('start')) {
      return -1;
    }

    return 0;
  }),
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
      this.saveLocally(this.get('model.id'), reference);

      this.get('player').regions.list[region.get('id')].remove();
    });

    return false;
  },
  saveLocally(id, reference) {
    let item = window.localStorage.getItem(id);
    let references;

    if (item) {
      references = JSON.parse(item);
    } else {
      references = [];
    }

    let payload = reference.getProperties('end', 'start', 'deltas');

    payload.episodeId = reference.get('episode.id');
    references.push(payload);
    window.localStorage.setItem(id, JSON.stringify(references));
  },
  play(start) {
    if (this.get('player')) {
      this.get('player').play(start);
    }
  },
  didUpdateAttrs() {
    this._super(...arguments);
    let at = parseInt(this.get('at'));
    if (at > 0) {
      this.play(at);
    }
  }
});
