import Ember from 'ember';

export default Ember.Route.extend({
  metrics: Ember.inject.service(),
  model() {
    return this.store.query('episode', {
      include: 'podcast',
      sort: '-pub-date',
      page: {
        offset: 0,
        limit: 25
      }
    });
  },
  _trackPage() {
    Ember.run.scheduleOnce('afterRender', this, () => {
      const page = document.location.pathname;
      const title = 'index';

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
