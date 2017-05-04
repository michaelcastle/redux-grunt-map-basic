define([
    './constants',
    'vendor/ReduxUndo/redux-undo',
    './initialState'
], function (constants, reduxUndo, initialState) {
    var distance = function (state, action) {
        switch (action.type) {
            case constants.actionTypes.DISTANCE_UPDATE:
                return {
                    distance: action.payload.distance,
                    totalDistance: action.payload.totalDistance,
                    area: action.payload.area,
                    visible: true
                };
            case constants.actionTypes.DISTANCE_CLEAR:
                return {
                    visible: false
                };
            default:
                return state;
        }
    };
    var updateView = function (state, action) {
        if (state === undefined) state = initialState.view;
        switch (action.type) {
            case constants.actionTypes.UPDATE_EXTENT:
                var extent = action.payload.extent ? action.payload.extent.clone() : {};
                var viewpoint = action.payload.viewpoint ? action.payload.viewpoint.clone() : {};
                return {
                    extent: extent,
                    rotation: action.payload.rotation,
                    zoom: action.payload.zoom,
                    type: action.payload.type,
                    viewpoint: viewpoint
                };

            default:
                return state;
        }
    };

    return {
        loading: function (state, action) {
            if (state === undefined) state = { isLoading: true };
            switch (action.type) {
                case constants.actionTypes.LOADING:
                    return {
                        isLoading: action.payload.isLoading
                    };

                default:
                    return state;
            }
        },
        latLongUpdate: function (state, action) {
            if (state === undefined) state = {};
            switch (action.type) {
                case constants.actionTypes.LAT_LONG_UPDATE:
                    return {
                        xy: action.payload.xy,
                        point: action.payload.point
                    };

                default:
                    return state;
            }
        },
        distanceUpdate: function (state, action) {
            if (state === undefined) state = { visible: false };
            return distance(state, action);
        },
        updateView: reduxUndo.default(updateView, {
            limit: 50,
            undoType: constants.actionTypes.BACK
        }),
        back: function (state, action) {
            if (state === undefined) state = 0;
            if (action.type !== constants.actionTypes.BACK) {
                return state;
            }
            return state + action.payload;
        }
    };
});