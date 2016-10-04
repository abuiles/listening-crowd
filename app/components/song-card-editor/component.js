import Ember from 'ember';
import spotifyUri from 'npm:spotify-uri';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    this.set('href', this.get('attrs.payload.href') || '');
  },
  save(href) {
    if (href) {
      let parsed = spotifyUri.parse(href);

      this.saveCard({href: spotifyUri.formatURI(parsed)});
    } else {
      this.cancel();
    }
  },
  cancel() {
    this.attrs.removeCard();
  },
  didInsertElement() {
    this.$('input').focus();
  }
});
