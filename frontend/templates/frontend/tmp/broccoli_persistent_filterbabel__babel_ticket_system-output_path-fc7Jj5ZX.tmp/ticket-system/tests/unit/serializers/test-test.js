define('ticket-system/tests/unit/serializers/test-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('test', 'Unit | Serializer | test', {
    // Specify the other units that are required for this test.
    needs: ['serializer:test']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});