define('ticket-system/components/nav-bar', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Component.extend({
        hideModal: false,
        actions: {
            showModal: function showModal() {
                this.toggleProperty('hideModal');
            }
        }
    });
});