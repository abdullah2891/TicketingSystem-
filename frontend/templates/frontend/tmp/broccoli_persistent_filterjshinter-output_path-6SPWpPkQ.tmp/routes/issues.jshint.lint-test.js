QUnit.module('JSHint | routes/issues.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/issues.js should pass jshint.\nroutes/issues.js: line 2, col 8, \'AuthenticatedRouteMixin\' is defined but never used.\n\n1 error');
});
