import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    let id = params.episodePermalink.split('-')[0];
    return this.store.findRecord('episode', id);
  },
  afterModel(episode) {
    return episode.get('waveform');
  },
  serialize(model) {
    return { episodePermalink: model.get('permalink') };
  }
});
