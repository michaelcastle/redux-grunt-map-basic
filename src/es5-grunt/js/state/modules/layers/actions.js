define([
    './constants',
    'esri/core/Collection'
], function (constants, Collection) {
    return {
        layersAdd: function (items) {
            var layers = {};
            var order = new Collection();
            items.forEach(function (layer) {
                var item = {
                    id: layer.id,
                    opacity: layer.opacity,
                    visible: layer.visible,
                    title: layer.title,
                    group: layer.group,
                    containsFeatures: (layer.type !== 'feature' || layer.url || layer.source.length > 0)
                };
                layers[item.id] = item;
                order.push(item.id);
            });
            return {
                type: constants.actionTypes.LAYERS_ADD,
                payload: {
                    layers: layers,
                    order: order
                }
            };
        },
        layerContainsFeatures: function (id, containsFeatures) {
            return {
                type: constants.actionTypes.LAYER_CONTAINS_FEATURES,
                payload: {
                    id: id,
                    containsFeatures: containsFeatures
                }
            };
        },
        layerVisibility: function (id, visible) {
            return {
                type: constants.actionTypes.LAYER_VISIBILITY,
                payload: {
                    id: id,
                    visible: visible
                }
            };
        },
        layerOpacity: function (id, opacity) {
            return {
                type: constants.actionTypes.LAYER_OPACITY,
                payload: {
                    id: id,
                    opacity: opacity
                }
            };
        },
        layerClear: function (id) {
            return {
                type: constants.actionTypes.LAYER_CONTAINS_FEATURES,
                payload: {
                    id: id,
                    containsFeatures: false
                }
            };
        },
        reorder: function (oldIndex, newIndex) {
            return {
                type: constants.actionTypes.REORDER,
                payload: {
                    oldIndex: oldIndex,
                    newIndex: newIndex
                }
            };
        }
    };
});