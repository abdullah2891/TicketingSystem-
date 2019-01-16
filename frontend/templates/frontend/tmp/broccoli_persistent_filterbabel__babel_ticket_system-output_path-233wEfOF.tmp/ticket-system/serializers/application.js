define("ticket-system/serializers/application", ["exports", "ember-data"], function (exports, _emberData) {
    exports["default"] = _emberData["default"].JSONAPISerializer.extend({

        normalizeResponse: function normalizeResponse(store, type, payload) {
            console.log(payload);
            var modifiedPayload = payload instanceof Array ? payload.map(function (object) {
                return {
                    "id": object.id,
                    "type": type.modelName,
                    "attributes": object
                };
            }) : { "id": payload.id, "type": type.modelName, "attributes": payload };

            return { "data": modifiedPayload };
        },

        serialize: function serialize(snapshot, options) {
            var json = this._super.apply(this, arguments);
            console.log(" updating and put serialize ");
            console.log(json);

            return json.data.attributes;
        }

    });
});