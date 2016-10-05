import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    this.set('quote', this.attrs.payload.value.quote || '');
    this.set('quotee', this.attrs.payload.value.quotee || '');
  },
  save(quote, quotee) {
    if (quote) {
      this.saveCard({quote, quotee});
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
