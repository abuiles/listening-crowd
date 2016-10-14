import Ember from 'ember';

export default Ember.Component.extend({
  quote: Ember.computed.readOnly('payload.quote'),
  quotee: Ember.computed.readOnly('payload.quotee'),
  doubleClick() {
    this.attrs.editCard(this.attrs.payload);
  }
});
