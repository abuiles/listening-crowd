import Ember from 'ember';
import config from 'listening-crowd/config/environment';

export default Ember.Service.extend({
  session: Ember.inject.service(),
  ajax: Ember.inject.service(),
  store: Ember.inject.service(),
  cardNames: [
    'video-card',
    'song-card',
    'amazon-card',
    'quote-card',
    'image-card'
  ],
  user: Ember.computed('session.data.authenticated.jwt', {
    get() {
      let jwt = this.get('session.data.authenticated.jwt');
      let promise = Ember.RSVP.resolve(null);

      if (jwt) {
        let host = config.pinnaHost;
        let url = `${host}/v1/me`;
        promise = this.get('ajax').request(
          url, {
            headers: {
              'Authorization': `Bearer ${this.get('session.data.authenticated.jwt')}`,
              'Accept': 'application/vnd.api+json'

            }
          }).then((data) => {
            let store = this.get('store');

            return store.push(store.normalize('user', data.data));
        }, function() {
          return null;
        });
      }

      return promise;
    }
  }).readOnly()
});
