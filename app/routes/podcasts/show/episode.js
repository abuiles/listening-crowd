import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  model(params) {
    let id = params.episodePermalink.split('-')[0];
    return this.store.findRecord('episode', id);
  },
  afterModel(episode) {
    return episode.get('waveform');
  },
  setupController(controller, model) {
    this._super(...arguments);
    model.get('podcast').then(() =>  {
      this.get('ajax').request(model.get('waveformDataUrl')).then((data) => {
        controller.set('waveformData', data.data);
      });
    });
  },
  serialize(model) {
    return { episodePermalink: model.get('permalink') };
  }
});
