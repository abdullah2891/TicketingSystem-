define('ticket-system/tests/unit/serializers/test-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/serializers/test-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/test-test.js should pass jshint.');
  });
});