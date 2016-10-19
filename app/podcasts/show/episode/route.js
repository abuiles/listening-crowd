import Ember from 'ember';
import TrackPage from 'listening-crowd/mixins/track-page';

export default Ember.Route.extend(TrackPage, {
  ajax: Ember.inject.service(),
  headData: Ember.inject.service(),
  model(params) {
    let id = params.episodePermalink.split('-')[0];
    return this.store.findRecord('episode', id, {
      include: 'podcast'
    });
  },
  afterModel(model) {
    let meta = {
      card: 'summary',
      title: model.get('title'),
      description: model.get('itunesSubtitle'),
      site: '@listeningcrowd',
      creator: '@listeningcrowd',
      image: model.get('podcast.itunesImage')
    };

    for (var m in meta) {
      this.get('headData').set(m, meta[m]);
    }
  },
  serialize(model) {
    return { episodePermalink: model.get('permalink') };
  }
});
