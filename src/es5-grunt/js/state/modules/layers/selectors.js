define([
], function () {
    var selector = {
        toc: function (state) {
            return state.layers;
        },
        layerVisibility: function (state, id) {
            return state.layers.layers[id].visible;
        },
        layerOpacity: function (state, id) {
            return state.layers.layers[id].opacity;
        },
        layerClear: function (state, id) {
            return state.layers.layers[id].containsFeatures;
        },
        tocOrder: function (state) {
            return state.layers.order;
        }
    };
    return selector;
});