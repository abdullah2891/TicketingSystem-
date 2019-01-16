define('ticket-system/tests/authorizers/token.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | authorizers/token.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'authorizers/token.js should pass jshint.');
  });
});