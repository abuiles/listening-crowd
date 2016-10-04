import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    this.set('href', this.get('attrs.payload.href') || '');
  },
  save(href) {
    if (href) {
      this.saveCard({href});
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
