import Ember from 'ember';
import TrackPage from 'listening-crowd/mixins/track-page';

export default Ember.Route.extend(TrackPage, {
  model(params) {
    let id = params.podcastPermalink.split('-')[0];

    return this.store.findRecord('podcast', id);
  },
  setupController(controller, model) {
    this._super(...arguments);
    model.query('episodes', { sort: '-pub-date' }).then(function(episodes) {
      controller.set('episodes', episodes);
    });

    this.render('podcasts/sidebar', {
      into: 'application',
      outlet: 'sidebar',
      model: model,
      controller: 'podcasts/show'
    });
  },
  serialize(model) {
    return { podcastPermalink: model.get('permalink') };
  },
  deactivate() {
    this.controller.set('episodes', []);
  }
});
