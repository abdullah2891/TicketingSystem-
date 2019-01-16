define('ticket-system/models/project', ['exports', 'ember-data'], function (exports, _emberData) {
    exports['default'] = _emberData['default'].Model.extend({
        Project: _emberData['default'].attr()
    });
});