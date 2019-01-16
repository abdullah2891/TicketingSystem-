define('ticket-system/models/issue', ['exports', 'ember-data'], function (exports, _emberData) {
    exports['default'] = _emberData['default'].Model.extend({
        description: _emberData['default'].attr(),
        owner: _emberData['default'].attr(),
        status: _emberData['default'].attr(),
        title: _emberData['default'].attr(),
        projects: _emberData['default'].attr()
    });
});