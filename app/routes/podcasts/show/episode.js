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
  },
  metrics: Ember.inject.service(),
  _trackPage() {
    Ember.run.scheduleOnce('afterRender', this, () => {
      const page = document.location.pathname;
      const title = 'podcasts.show.episode';

      this.get('metrics').trackPage({ page, title });
    });
  },
  actions: {
    didTransition: function() {
      this._trackPage();
      return true;
    }
  }
});
