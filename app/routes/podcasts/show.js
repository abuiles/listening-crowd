import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    let id = params.podcastPermalink.split('-')[0];

    return this.store.findRecord('podcast', id);
  },
  setupController(controller, model) {
    this._super(...arguments);

    this.render('podcasts/sidebar', {
      into: 'application',
      outlet: 'sidebar',
      model: model
    });
  },
  serialize(model) {
    return { podcastPermalink: model.get('permalink') };
  },
  metrics: Ember.inject.service(),
  _trackPage() {
    Ember.run.scheduleOnce('afterRender', this, () => {
      const page = document.location.pathname;
      const title = 'podcasts.show';

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
