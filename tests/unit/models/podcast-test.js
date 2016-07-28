import { moduleForModel, test } from 'ember-qunit';

moduleForModel('podcast', 'Unit | Model | podcast', {
  // Specify the other units that are required for this test.
  needs: ['model:episode']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
