define([
    'vendor/Redux/redux.min',
    'app/state/map/reducers',
    'app/state/ui/reducers',
    'app/state/toc/reducers'
], function (redux, mapReducers, uiReducers, tocReducers) {
    var combined = redux.combineReducers({
        loading: mapReducers.loading,
        latLong: mapReducers.latLongUpdate,
        toc: tocReducers.toc,
        view: mapReducers.updateView,
        buttonClick: uiReducers.buttonClick
    });

    return combined;
});
