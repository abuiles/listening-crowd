import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  licSession: Ember.inject.service(),
  init() {
    this._super(...arguments);
    this.set('currentTime', 0);
    this.set('feedbackLoop', 10);
  },
  cardNames: [
    'video-card',
    'song-card',
    'amazon-card'
  ],
  annotations: Ember.computed.filterBy('model.annotations', 'isNew', false),
  sortedAnnotations: Ember.computed.sort('annotations', function(a,b) {
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
      let annotation = this.get('model').get('annotations').createRecord({
        episode: this.get('model')
        // timestamp: currentTime
      });
      this.set('annotation', annotation);
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
        annotation: null,
        region: null
      });
    }
  },
  save() {
    let annotation = this.get('annotation');
    let region = this.get('region');
    this.get('licSession.user').then((user) => {
      annotation.setProperties({
        start: region.get('start'),
        end: region.get('end'),
        user: user
      });

      annotation.save().then(() =>  {
        this.setProperties({
          annotation: null,
          region: null
        });

        this.get('player').segments.removeAll();
      });
    });

    return false;
  },
  currentTimeAnnotations() {
    return this.get('model.annotations').then((annotations) => {
      let filtered =  annotations.filterBy('start', this.get('at'));

      if (this.get('player')) {
        let segments = filtered.map(function(annotation) {
          return {
            startTime: annotation.get('start'),
            endTime: annotation.get('end'),
            editable: false,
            id: annotation.get('id'),
            labelText: 'Selected annotation'
          };
        });
        this.get('player').segments.add(segments);
      }

      return filtered;
    });
  },
  play(start ) {
    if (this.get('player')) {
      this.get('player').time.setCurrentTime(start);
      this.get('player').player.play();
      this.currentTimeAnnotations();
    }
  },
  cancel() {
    this.get('player').segments.removeAll();
    this.setProperties({
      annotation: null,
      region: null
    });
  },
  didUpdateAttrs() {
    this._super(...arguments);
    let at = parseInt(this.get('at'));
    if (at > 0) {
      this.play(at);
    }
  }
});
