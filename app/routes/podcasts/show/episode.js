import Ember from 'ember';
import TrackPage from 'listening-crowd/mixins/track-page';

export default Ember.Route.extend(TrackPage, {
  ajax: Ember.inject.service(),
  model(params) {
    let id = params.episodePermalink.split('-')[0];
    return this.store.findRecord('episode', id, {
      include: 'podcast'
    });
  },
  serialize(model) {
    return { episodePermalink: model.get('permalink') };
  }
});
