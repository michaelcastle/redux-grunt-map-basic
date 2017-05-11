define([
    './constants'
], function (constants) {
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

    return {
        loading: function (state, action) {
            if (state === undefined) state = { isLoading: true };
            switch (action.type) {
                case constants.actionTypes.LOADING:
                    return action.payload;

                default:
                    return state;
            }
        },
        coordinatesUpdate: function (state, action) {
            if (state === undefined) state = {};
            switch (action.type) {
                case constants.actionTypes.LAT_LONG_UPDATE:
                    return action.payload;

                default:
                    return state;
            }
        },
        distanceUpdate: function (state, action) {
            if (state === undefined) state = { visible: false };
            return distance(state, action);
        }
    };
});