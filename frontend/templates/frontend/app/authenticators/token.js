// app/authenticators/devise.js
import token from 'ember-simple-auth-token/authenticators/token';

export default token.extend({  
  serverTokenEndpoint: 'https://ticketing-system-abdullah2891.c9users.io/token/'
});