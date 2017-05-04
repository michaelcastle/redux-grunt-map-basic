define([
    './constants'
], function (constants) {
    return {
        buttonClick: function (name) {
            return {
                type: constants.actionTypes.BUTTON_CLICK,
                payload: {
                    name: name
                }
            };
        }
    };
});