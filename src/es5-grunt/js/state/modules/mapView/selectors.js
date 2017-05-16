define([
], function () {
    var selector = {
        /*view: function (state) {
            return state.view.present;
        },*/
        zoom: function (state) {
            if (!state.view.present) return;
            return state.view.present.zoom;
        },
        extent: function (state) {
            if (!state.view.present) return;
            return state.view.present;
        },
        rotation: function (state) {
            if (!state.view.present) return;
            return state.view.present.rotation;
        },
        type: function (state) {
            if (!state.view.present) return;
            return state.view.present.type;
        }
    };
    return selector;
});