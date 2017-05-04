define([
    './constants'
], function (constants) {
    return {
        loading: function (visible) {
            return {
                type: constants.actionTypes.LOADING,
                payload: {
                    visible: visible
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
        },
        changeExtent: function (extent) {
            return {
                type: constants.actionTypes.UPDATE_EXTENT,
                payload: {
                    extent: extent
                }
            };
        }
    };
});