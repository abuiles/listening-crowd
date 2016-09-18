import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    let id = params.podcastPermalink.split('-')[0];

    return this.store.findRecord('podcast', id);
  },
  serialize(model) {
    return { podcastPermalink: model.get('permalink') };
  }
});
