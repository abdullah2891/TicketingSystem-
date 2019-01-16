define('ticket-system/routes/issues', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
    exports['default'] = _ember['default'].Route.extend({
        model: function model() {
            var issue = this.get('store').findAll('issue');
            console.log(issue);
            return issue;
        }
    });
});