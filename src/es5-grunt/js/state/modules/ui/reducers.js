define([
    './constants',
    'vendor/ReduxUndo/redux-undo',
    './initialState'
], function (constants, reduxUndo, initialState) {
    var buttonClick = function (state, action) {
        if (state === undefined) state = initialState.buttonClick;
        if (action.type !== constants.actionTypes.EVENT) {
            return state;
        }
        return {
            name: action.payload.name,
            count: state.count + 1
        };
    };
    return {
        buttonClick: reduxUndo.default(buttonClick, {
            limit: 50,
            undoType: constants.actionTypes.EVENT
        })
    };
});