define('ticket-system/authorizers/token', ['exports', 'ember-simple-auth-token/authorizers/token'], function (exports, _emberSimpleAuthTokenAuthorizersToken) {
  exports['default'] = _emberSimpleAuthTokenAuthorizersToken['default'].extend({});
});
// app/authorizers/devise.js