define([
    './constants'
], function (constants) {
    return {
        loading: function (isLoading) {
            return {
                type: constants.actionTypes.LOADING,
                payload: {
                    loading: isLoading
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
        changeExtent: function (view) {
            return {
                type: constants.actionTypes.UPDATE_EXTENT,
                payload: {
                    extent: view.extent,
                    rotation: view.rotation,
                    zoom: view.zoom,
                    type: view.type,
                    viewpoint: view.viewpoint
                }
            };
        },
        back: function () {
            return {
                type: constants.actionTypes.BACK,
                payload: 1
            };
        }
    };
});