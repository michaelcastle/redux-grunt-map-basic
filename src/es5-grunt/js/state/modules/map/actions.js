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
        coordinatesUpdate: function (x, y, latitude, longitude) {
            return {
                type: constants.actionTypes.LAT_LONG_UPDATE,
                payload: {
                    x: x,
                    y: y,
                    latitude: latitude,
                    longitude: longitude
                }
            };
        }
    };
});