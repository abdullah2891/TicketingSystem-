define('ticket-system/models/test', ['exports', 'ember-data'], function (exports, _emberData) {
	exports['default'] = _emberData['default'].Model.extend({
		test: _emberData['default'].attr()
	});
});