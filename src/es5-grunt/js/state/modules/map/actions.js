define([
    './constants'
], function (constants) {
    return {
        loading: function (isLoading) {
            return {
                type: constants.actionTypes.LOADING,
                payload: {
                    isLoading: isLoading
                }
            };
        },
        latLongUpdate: function (xy, point) {
            return {
                type: constants.actionTypes.LAT_LONG_UPDATE,
                payload: {
                    xy: xy,
                    point: point
                }
            };
        }
    };
});