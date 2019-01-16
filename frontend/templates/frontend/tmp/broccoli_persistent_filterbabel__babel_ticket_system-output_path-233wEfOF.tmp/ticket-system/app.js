define('ticket-system/app', ['exports', 'ember', 'ticket-system/resolver', 'ember-load-initializers', 'ticket-system/config/environment'], function (exports, _ember, _ticketSystemResolver, _emberLoadInitializers, _ticketSystemConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _ticketSystemConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _ticketSystemConfigEnvironment['default'].podModulePrefix,
    Resolver: _ticketSystemResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _ticketSystemConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});