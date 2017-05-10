define([
], function () {
    var selector = {
        view: function (state) {
            return state.view.present;
        }
    };
    return selector;
});