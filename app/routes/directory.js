import Ember from 'ember';
import TrackPage from 'listening-crowd/mixins/track-page';

export default Ember.Route.extend(TrackPage, {
  model() {
    return this.store.query('podcast', {
      sort: 'title'
    });
  }
});
