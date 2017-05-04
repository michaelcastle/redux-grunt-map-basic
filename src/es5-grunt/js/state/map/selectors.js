define([
], function () {
    var selector = {
        loading: function (state) {
            return state.loading.visible;
        },
        latLong: function (state) {
            return state.latLong;
        },
        distance: function (state) {
            return state.distance;
        },
        back: function (state) {
            return state.back;
        }
    };
    return selector;
});