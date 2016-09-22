import Ember from 'ember';

export default Ember.Route.extend({
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
