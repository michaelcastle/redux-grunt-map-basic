/**
 * This widget is used to control the Table of contents widget. Displays the layers
 * and opacity of each layer and allows the layers order to be controlled by the user
 * 
 * @module js/widgets/LayerController
 */
define([
    'dojo/_base/declare',
    'dojo/_base/lang',

    // redux
    '../actions',
    '../observers'
], function (declare, lang, actions, observers) {

    return declare([], {

        store: null,
        map: null,

        constructor: function (store, map) {
            this.store = store;
            this.map = map;

            // Update layer list when new layers are added to the map
            this.map.layers.on('change', lang.hitch(this, function (changed) {
                this.store.dispatch(actions.layersAdd(changed.added));
                changed.added.forEach(function (layer) {
                    layer.then(this.setObservable.bind(this));
                }, this);
            }));
            observers.layerOrder(this.store, this.setLayerOrder.bind(this));
        },

        setObservable: function (layer) {
            observers.layerVisibility(this.store, layer.id, this.setLayerVisible.bind(this));
            observers.layerOpacity(this.store, layer.id, this.setLayerOpacity.bind(this));
            observers.layerClear(this.store, layer.id, this.clearLayerById.bind(this));
            if (layer.type === 'feature') {
                layer.source.on('change', lang.hitch(this, function (changed) {
                    if (changed.added.length > 0) {
                        this.store.dispatch(actions.layerContainsFeatures(layer.id, true));
                    }
                }));
            }
        },

        getLayer: function (id) {
            var layer = this.map.layers.find(function (layer) {
                return layer.id === id;
            });
            return layer;
        },

        setLayerVisible: function (id, visible) {
            var layer = this.getLayer(id);
            layer.visible = visible;
        },

        setLayerOpacity: function (id, opacity) {
            var layer = this.getLayer(id);
            layer.opacity = opacity;
        },

        setLayerOrder: function (order) {
            order.forEach(function (id, i) {
                var layerIndex = this.map.layers.findIndex(function (item) {
                    return item.id === id;
                });
                if (layerIndex !== i) {
                    this.map.reorder(this.map.layers.items[layerIndex], i);
                }
            }, this);
        },

        clearLayerById: function (id) {
            var layer = this.getLayer(id);
            if (layer.source) {
                layer.source.removeAll();
            }
        }
    });
});