import Ember from 'ember';
import spotifyUri from 'npm:spotify-uri';

export default Ember.Component.extend({
  src: Ember.computed('payload.href', {
    get() {
      let parsed = spotifyUri.parse(this.get('payload.href'));

      return spotifyUri.formatEmbedURL(parsed);
    }
  }).readOnly()
});
