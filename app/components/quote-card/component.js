import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    this.set('payload', this.attrs.payload.value);
  },
  quote: Ember.computed.readOnly('payload.quote'),
  quotee: Ember.computed.readOnly('payload.quotee'),
  doubleClick() {
    this.attrs.editCard(this.attrs.payload);
  }
});
