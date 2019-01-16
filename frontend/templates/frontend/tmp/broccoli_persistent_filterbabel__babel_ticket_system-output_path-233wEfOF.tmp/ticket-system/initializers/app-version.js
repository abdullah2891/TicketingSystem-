define('ticket-system/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'ticket-system/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _ticketSystemConfigEnvironment) {
  var _config$APP = _ticketSystemConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});