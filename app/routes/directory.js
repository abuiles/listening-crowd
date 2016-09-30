import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.query('podcast', {
      sort: 'title'
    });
  },
  metrics: Ember.inject.service(),
  _trackPage() {
    Ember.run.scheduleOnce('afterRender', this, () => {
      const page = document.location.pathname;
      const title = 'directory';

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
