// Actions: Name them them <noun>-<verb>, eg Project-Create, User-Login. 
//The rationale behind this is that you want them grouped together by the object type, rather than the action type.
define([
], function () {
    return {
        actionTypes: {
            BUTTON_CLICK: 'ui-button-click',
            ZOOM_IN: 'ui-zoom-in',
            ZOOM_OUT: 'ui-zoom-out'
        },
        buttonClick: {
            RESET: 'reset-map-click',
            ZOOM_IN: 'zoom-in',
            ZOOM_OUT: 'zoom-out',
            COMPASS_NORTH: 'compass-click',
            HOME: 'home-click'
        }
    };
});