define('ticket-system/tests/helpers/start-app', ['exports', 'ember', 'ticket-system/app', 'ticket-system/config/environment'], function (exports, _ember, _ticketSystemApp, _ticketSystemConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    // use defaults, but you can override
    var attributes = _ember['default'].assign({}, _ticketSystemConfigEnvironment['default'].APP, attrs);

    _ember['default'].run(function () {
      application = _ticketSystemApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});