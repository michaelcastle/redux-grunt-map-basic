define([
    'vendor/Redux/redux.min',
    './modules/map/reducers',
    './modules/ui/reducers',
    './modules/layers/reducers',
    './modules/mapView/reducers'
], function (redux, mapReducers, uiReducers, layersReducers, mapViewReducers) {
    var combined = redux.combineReducers({
        loading: mapReducers.loading,
        latLong: mapReducers.latLongUpdate,
        layers: layersReducers.layers,
        view: mapViewReducers.updateView,
        buttonClick: uiReducers.buttonClick
    });

    return combined;
});
