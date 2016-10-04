import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    this.set('href', this.get('attrs.payload.href') || '');
  },
  save(href) {
    if (href) {
      let parsed = this.parse(href);

      this.saveCard({href: parsed});
    } else {
      this.cancel();
    }
  },
  cancel() {
    this.attrs.removeCard();
  },
  parse(text) {
    let src = text;

    if (/<iframe/.test(src)) {
      src = this.$(text).attr('src');
    }

    return src;
  },
  didInsertElement() {
    this.$('input').focus();
  }
});
