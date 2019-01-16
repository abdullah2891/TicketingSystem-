QUnit.module('JSHint | components/issue-card.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'components/issue-card.js should pass jshint.\ncomponents/issue-card.js: line 26, col 19, Missing semicolon.\n\n1 error');
});
