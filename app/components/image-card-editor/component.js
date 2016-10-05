import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    this.set('src', this.get('attrs.payload.value.src') || '');
    this.set('title', this.get('attrs.payload.value.title') || '');
    this.set('alt', this.get('attrs.payload.value.alt') || '');
  },
  save(src, title, alt ) {
    if (src) {
      this.saveCard({src, title, alt});
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
