define("ticket-system/adapters/application", ["exports", "ember-data"], function (exports, _emberData) {
    exports["default"] = _emberData["default"].RESTAdapter.extend({
        namespace: "api",
        headers: {
            "Accept": "application/json"
        },
        authorizer: 'authorizer:token'
    });
});