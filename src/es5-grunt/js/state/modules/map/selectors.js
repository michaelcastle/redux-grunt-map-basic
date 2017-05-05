define([
], function () {
    var selector = {
        loading: function (state) {
            return state.loading.isLoading;
        },
        latLong: function (state) {
            return state.latLong;
        },
        distance: function (state) {
            return state.distance;
        }
    };
    return selector;
});