define([
    './appStore',
    './modules/map/index',
    './modules/ui/index',
    './modules/layers/index',
    './modules/mapView/index'
], function (appStore, map, ui, layers, mapView) {

    var state = {
        store: appStore,
        map: map,
        ui: ui,
        layers: layers,
        mapView: mapView
    };

    return state;
});
