define([
], function () {
    var selector = {
        toc: function (state) {
            return state.toc;
        },
        tocLayerVisibility: function (state, id) {
            return state.toc.layers[id].visible;
        },
        tocLayerOpacity: function (state, id) {
            return state.toc.layers[id].opacity;
        },
        tocLayerClear: function (state, id) {
            return state.toc.layers[id].containsFeatures;
        },
        tocOrder: function (state) {
            return state.toc.order;
        }
    };
    return selector;
});