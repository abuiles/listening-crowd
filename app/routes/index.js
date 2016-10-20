import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.query('episode', {
      include: 'podcast',
      sort: '-pub-date',
      page: {
        offset: 0,
        limit: 25
      }
    });
  }
});
