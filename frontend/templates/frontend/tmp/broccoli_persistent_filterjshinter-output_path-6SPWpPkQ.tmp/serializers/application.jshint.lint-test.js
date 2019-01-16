QUnit.module('JSHint | serializers/application.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'serializers/application.js should pass jshint.\nserializers/application.js: line 19, col 26, \'options\' is defined but never used.\nserializers/application.js: line 19, col 15, \'snapshot\' is defined but never used.\n\n2 errors');
});
