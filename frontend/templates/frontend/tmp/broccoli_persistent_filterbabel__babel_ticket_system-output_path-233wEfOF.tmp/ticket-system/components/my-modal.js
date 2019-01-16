define('ticket-system/components/my-modal', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    show: (function () {
      this.$('.modal').modal();
    }).on('didInsertElement')
  });
});