define('ticket-system/router', ['exports', 'ember', 'ticket-system/config/environment'], function (exports, _ember, _ticketSystemConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _ticketSystemConfigEnvironment['default'].locationType,
    rootURL: _ticketSystemConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('issues');
    this.route('projects');
    this.route('login');
  });

  exports['default'] = Router;
});