define('ticket-system/tests/components/submit-issue.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/submit-issue.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/submit-issue.js should pass jshint.');
  });
});