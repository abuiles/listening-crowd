import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  queryParams: ['f', 't'],
  f: 0,
  t: 10,
  licSession: Ember.inject.service(),
  episode: Ember.inject.controller('podcasts.show.episode'),
  currentPlayer: Ember.inject.service(),
  cancel(annotation) {
    this.get('currentPlayer.player').segments.removeAll();

    if (!annotation.get('isNew')) {
      annotation.rollbackAttributes();
    } else {
      annotation.unloadRecord();
    }

    this.transitionToRoute('podcasts.show.episode');
  },
  save: task(function*(annotation) {
    let segment = annotation._segment;

    yield this.get('licSession.user').then((user) => {
      annotation.setProperties({
        start: segment.startTime,
        end: segment.endTime,
        user: user
      });

      return annotation.save().then(() =>  {
        this.get('currentPlayer.player').segments.removeAll();

        return this.transitionToRoute('podcasts.show.episode');
      });
    });
  }).drop()
});
