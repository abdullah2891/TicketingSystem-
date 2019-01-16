define('ticket-system/tests/helpers/resolver', ['exports', 'ticket-system/resolver', 'ticket-system/config/environment'], function (exports, _ticketSystemResolver, _ticketSystemConfigEnvironment) {

  var resolver = _ticketSystemResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _ticketSystemConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _ticketSystemConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});