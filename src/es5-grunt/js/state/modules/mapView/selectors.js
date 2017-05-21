define([
], function () {
    var selector = {
        /*view: function (state) {
            return state.view.present;
        },*/
        zoom: function (state) {
            if (!state) return;
            return state.zoom;
        },
        extent: function (state) {
            if (!state) return;
            return state.extent;
        },
        viewpoint: function (state) {
            if (!state) return;
            return state.viewpoint;
        },
        rotation: function (state) {
            if (!state) return;
            return state.rotation;
        },
        type: function (state) {
            if (!state) return;
            return state.type;
        },
        view: function (state) {
            if (!state.view.present) return;
            return state.view.present;
        }
    };
    return selector;
});