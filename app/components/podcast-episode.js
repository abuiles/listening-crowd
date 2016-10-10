import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  licSession: Ember.inject.service(),
  currentPlayer: Ember.inject.service(),
  player: Ember.computed.readOnly('currentPlayer.player'),
  init() {
    this._super(...arguments);
    this.set('currentTime', 0);
    this.set('feedbackLoop', 10);
  },
  cardNames: Ember.computed.readOnly('licSession.cardNames'),
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
  segmentCreated(segment, annotation = null) {
    if (!annotation) {
      annotation = this.get('model').get('annotations').createRecord({
        episode: this.get('model')
      });
    }

    annotation._segment = segment;

    this.transitionTo(
      'podcasts.show.episode.annotate',
      this.get('model.podcast'),
      this.get('model'),
      annotation
    );
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
  stop() {
    this.get('currentPlayer').pause();
  },
  cancel(annotation) {
    this.get('player').segments.removeAll();

    if (!annotation.get('isNew')) {
      annotation.rollbackAttributes();
    }

    this.setProperties({
      annotation: null,
      segment: null
    });
  },
  didUpdateAttrs() {
    this._super(...arguments);
    let at = parseInt(this.get('at'));
    if (at > 0) {
      this.play(at);
    }
  },
  delete(annotation) {
    annotation.destroyRecord();
  },
  playAnnotation(episode, annotation) {
    this.get('player').segments.removeAll();
    this.setProperties({
      annotation: null,
      region: null
    });

    this.transitionTo(annotation.get('start'));
  }
});
