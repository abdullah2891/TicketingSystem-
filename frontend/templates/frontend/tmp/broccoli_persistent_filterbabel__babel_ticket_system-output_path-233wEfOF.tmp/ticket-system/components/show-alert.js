define('ticket-system/components/show-alert', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Component.extend({

        show: (function () {
            this.$('.modal').modal();
        }).on('didInsertElement'),
        actions: {
            submit: function submit() {
                console.log("buubling up");
                this.$('.modal').modal('hide');
            }
        }

    });
});