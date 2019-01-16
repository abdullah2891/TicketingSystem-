define('ticket-system/tests/components/issue-card.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/issue-card.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/issue-card.js should pass jshint.\ncomponents/issue-card.js: line 26, col 19, Missing semicolon.\n\n1 error');
  });
});