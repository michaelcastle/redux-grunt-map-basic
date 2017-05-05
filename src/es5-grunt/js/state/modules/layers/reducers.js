define([
    './constants',
    'esri/core/Collection',
    'dojo/_base/lang'
], function (constants, Collection, lang) {
    var layers = function (state, action) {
        if (state === undefined) state = {
            layers: {},
            order: new Collection()
        };
        switch (action.type) {
            case constants.actionTypes.LAYERS_ADD:
                var layers = lang.clone(state.layers);
                lang.mixin(layers, action.payload.layers);

                var order = state.order.clone();
                order.addMany(action.payload.order);

                return {
                    layers: layers,
                    order: order
                };

            case constants.actionTypes.LAYER_VISIBILITY:
                state.layers[action.payload.id].visible = action.payload.visible;
                return state;

            case constants.actionTypes.LAYER_OPACITY:
                state.layers[action.payload.id].opacity = action.payload.opacity;
                return state;

            case constants.actionTypes.LAYER_CLEAR:
                state.layers[action.payload.id].containsFeatures = false;
                return state;

            case constants.actionTypes.LAYER_CONTAINS_FEATURES:
                state.layers[action.payload.id].containsFeatures = action.payload.containsFeatures;
                return state;

            case constants.actionTypes.REORDER:
                var items = state.order.clone();

                var oldi = (action.payload.oldIndex + 1 - items.length) * -1;
                var newi = (action.payload.newIndex + 1 - items.length) * -1;
                var item = items.getItemAt(oldi);
                items.reorder(item, newi);
                items.forEach(function (item, i) {
                    item.index = i;
                });

                return items;

            default:
                return state;
        }
    };

    return {
        layers: function (state, action) {
            if (state === undefined) state = {
                layers: {},
                order: new Collection()
            };
            switch (action.type) {
                case constants.actionTypes.LAYERS_ADD:
                    return layers(state, action);

                case constants.actionTypes.LAYER_VISIBILITY:
                    var visState = {
                        layers: lang.clone(state.layers),
                        order: state.order.clone()
                    };
                    return layers(visState, action);

                case constants.actionTypes.LAYER_OPACITY:
                    var opacState = {
                        layers: lang.clone(state.layers),
                        order: state.order.clone()
                    };
                    return layers(opacState, action);

                case constants.actionTypes.LAYER_CLEAR:
                    var lcState = {
                        layers: lang.clone(state.layers),
                        order: state.order.clone()
                    };
                    return layers(lcState, action);

                case constants.actionTypes.LAYER_CONTAINS_FEATURES:
                    var fState = {
                        layers: lang.clone(state.layers),
                        order: state.order.clone()
                    };
                    return layers(fState, action);

                case constants.actionTypes.REORDER:
                    return {
                        layers: lang.clone(state.layers),
                        order: layers(state, action)
                    };

                default:
                    return state;
            }
        }
    };
});