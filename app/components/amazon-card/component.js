import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    this.set('payload', this.attrs.payload.value);
  },
  src: Ember.computed('payload.href', {
    get() {
      let href = this.get('payload.href');

      return this.parse(href);
    }
  }).readOnly(),
  parse(text) {
    let src = text;

    if (/iframe/.test(src)) {
      src = this.$(text).attr('src');
    } else if (/<a/.test(src)) {
      src = this.$(text).attr('href');
    }

    return src;
  }
});
