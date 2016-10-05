import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    this.set('src', this.get('attrs.payload.value.src') || '');
    this.set('title', this.get('attrs.payload.value.title') || '');
    this.set('alt', this.get('attrs.payload.value.alt') || '');
  },
  doubleClick() {
    this.attrs.editCard(this.attrs.payload);
  }
});
