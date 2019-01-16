define('ticket-system/tests/helpers/compare-string.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/compare-string.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/compare-string.js should pass jshint.');
  });
});