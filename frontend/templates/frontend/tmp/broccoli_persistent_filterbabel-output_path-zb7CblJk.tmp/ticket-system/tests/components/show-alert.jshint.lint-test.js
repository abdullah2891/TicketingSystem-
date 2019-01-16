define('ticket-system/tests/components/show-alert.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/show-alert.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/show-alert.js should pass jshint.');
  });
});