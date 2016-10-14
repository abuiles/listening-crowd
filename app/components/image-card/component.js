import Ember from 'ember';

export default Ember.Component.extend({
  src:   Ember.computed.readOnly('payload.src'),
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
  doubleClick() {
    this.attrs.editCard(this.attrs.payload);
  }
});
