define('ticket-system/helpers/compare-string', ['exports', 'ember'], function (exports, _ember) {
    exports.compareString = compareString;

    function compareString(params /*, hash*/) {
        if (params.length === 3) {
            return params[0] !== params[1];
        }
        return params[0] === params[1];
    }

    exports['default'] = _ember['default'].Helper.helper(compareString);
});