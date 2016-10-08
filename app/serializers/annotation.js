import Ember from 'ember';
import DS from 'ember-data';

let assign = Ember.assign || Ember.merge;

export default DS.JSONAPISerializer.extend({
  serializeIntoHash(data, type, snapshot, options) {
    let json = this.serialize(snapshot, options);

    // TESTME
    delete json.data.attributes['slug'];

    assign(data, json);
  }
});
