define([
    './constants'
], function (constants) {
    return {
        resetTrackView: function () {
            return {
                type: constants.actionTypes.RESET,
                payload: 1
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
        },
        redo: function () {
            return {
                type: constants.actionTypes.REDO,
                payload: 1
            };
        },
        zoomIn: function (value) {
            if (!value) value = 1;
            return {
                type: constants.actionTypes.ZOOM_IN,
                payload: value
            };
        },
        zoomOut: function (value) {
            if (!value) value = 1;
            return {
                type: constants.actionTypes.ZOOM_OUT,
                payload: value
            };
        },
        rotation: function (value) {
            return {
                type: constants.actionTypes.ROTATION,
                payload: value
            };
        }
    };
});