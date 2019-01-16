define('ticket-system/tests/test-helper', ['exports', 'ticket-system/tests/helpers/resolver', 'ember-qunit'], function (exports, _ticketSystemTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_ticketSystemTestsHelpersResolver['default']);
});