define('ticket-system/tests/unit/helpers/compare-string-test', ['exports', 'ticket-system/helpers/compare-string', 'qunit'], function (exports, _ticketSystemHelpersCompareString, _qunit) {

  (0, _qunit.module)('Unit | Helper | compare string');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _ticketSystemHelpersCompareString.compareString)([42]);
    assert.ok(result);
  });
});