define('ticket-system/serializers/test', ['exports', 'ember-data'], function (exports, _emberData) {
	exports['default'] = _emberData['default'].RESTSerializer.extend({
		normalize: function normalize(model, hash, prop) {
			console.log(hash);
			console.log(prop);
			return this._super.apply(this, arguments);
		},

		pushPayload: function pushPayload(store, payload) {
			console.log(payload);
			console.log('++++store+++++');
			console.log(store);
			var modifiedPayload = [];

			modifiedPayload.push(payload.test);
			modifiedPayload.push(payload.test.cnl);

			return this._super(store, { test: modifiedPayload });
		}

	});
});