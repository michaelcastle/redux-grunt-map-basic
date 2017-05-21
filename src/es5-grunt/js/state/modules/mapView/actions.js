define([
    './constants',
    './selectors',
    './comparers'
], function (constants, selectors, comparers) {
    var viewChange = function (view) {
        return {
            type: constants.actionTypes.UPDATE_EXTENT,
            payload: {
                extent: selectors.extent(view),
                rotation: selectors.rotation(view),
                zoom: selectors.zoom(view),
                type: selectors.type(view),
                viewpoint: selectors.viewpoint(view)
            }
        };
    };
    return {
        resetTrackView: function () {
            return {
                type: constants.actionTypes.RESET,
                payload: 1
            };
        },
        changeExtent: function (view) {
            return function (dispatch, getState) {
                var currentState = getState().view.present;
                if (currentState && comparers.viewComparer(currentState, view)) {
                    return;
                }
                dispatch(viewChange(view));
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
        }
    };
});