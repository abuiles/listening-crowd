import { moduleForModel, test } from 'ember-qunit';

moduleForModel('waveform', 'Unit | Model | waveform', {
  // Specify the other units that are required for this test.
  needs: ['model:episode']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
