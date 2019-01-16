define('ticket-system/authenticators/token', ['exports', 'ember-simple-auth-token/authenticators/token'], function (exports, _emberSimpleAuthTokenAuthenticatorsToken) {
  exports['default'] = _emberSimpleAuthTokenAuthenticatorsToken['default'].extend({
    serverTokenEndpoint: 'https://ticketing-system-abdullah2891.c9users.io/token/'
  });
});
// app/authenticators/devise.js