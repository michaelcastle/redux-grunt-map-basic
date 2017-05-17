define([
    './constants',
    'vendor/ReduxUndo/redux-undo',
    './initialState'
], function (constants, reduxUndo, initialState) {
    var updateView = function (state, action) {
        //if (state === undefined) state = initialState.view;
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

            case constants.actionTypes.ZOOM_IN:
                return {
                    extent: state.extent ? state.extent.clone() : {},
                    rotation: state.rotation,
                    zoom: state.zoom + action.payload,
                    type: state.type,
                    viewpoint: state.viewpoint ? state.viewpoint.clone() : {}
                };

            case constants.actionTypes.ZOOM_OUT:
                return {
                    extent: state.extent ? state.extent.clone() : {},
                    rotation: state.rotation,
                    zoom: state.zoom - action.payload,
                    type: state.type,
                    viewpoint: state.viewpoint ? state.viewpoint.clone() : {}
                };

            case constants.actionTypes.ROTATION:
                return {
                    extent: state.extent ? state.extent.clone() : {},
                    rotation: action.payload,
                    zoom: state.zoom,
                    type: state.type,
                    viewpoint: state.viewpoint ? state.viewpoint.clone() : {}
                };

            default:
                return state;
        }
    };

    return {
        updateView: reduxUndo.default(updateView, {
            limit: 50,
            undoType: constants.actionTypes.BACK,
            redoType: constants.actionTypes.REDO,
            clearHistoryType: constants.actionTypes.RESET,
            filter: reduxUndo.includeAction([constants.actionTypes.UPDATE_EXTENT]),
            initialState: initialState.view
        }),
        reset: function (state, action) {
            return updateView(state, action);
        },
        zoomIn: function (state, action) {
            return updateView(state, action);
        },
        zoomOut: function (state, action) {
            return updateView(state, action);
        },
        rotation: function (state, action) {
            return updateView(state, action);
        }
    };
});