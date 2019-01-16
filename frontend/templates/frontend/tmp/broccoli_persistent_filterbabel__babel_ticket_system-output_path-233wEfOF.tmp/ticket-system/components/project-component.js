define('ticket-system/components/project-component', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Component.extend({

        actions: {
            jumpToIssue: function jumpToIssue() {
                console.log("clicking");
                var router = this.get('router');
                console.log(router);
                router.transitionToRoute('issues');
            }
        }
    });
});