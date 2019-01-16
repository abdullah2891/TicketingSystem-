define('ticket-system/tests/components/my-modal.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/my-modal.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/my-modal.js should pass jshint.');
  });
});