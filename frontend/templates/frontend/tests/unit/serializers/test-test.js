import { moduleForModel, test } from 'ember-qunit';

moduleForModel('test', 'Unit | Serializer | test', {
  // Specify the other units that are required for this test.
  needs: ['serializer:test']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
