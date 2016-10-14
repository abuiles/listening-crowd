import Ember from 'ember';

export default Ember.Component.extend({
  src: Ember.computed('payload.src', {
    get() {
      return this.get('payload.src') || '';
    }
  }).readOnly(),
  title: Ember.computed('payload.title', {
    get() {
      return this.get('payload.title') || '';
    }
  }).readOnly(),
  alt: Ember.computed('payload.alt', {
    get() {
      return this.get('payload.alt') || '';
    }
  }).readOnly(),
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
