// Actions: Name them them <noun>-<verb>, eg Project-Create, User-Login. 
//The rationale behind this is that you want them grouped together by the object type, rather than the action type.
define([
], function () {
    return {
        actionTypes: {
            UPDATE_EXTENT: 'view-extent-update',
            BACK: 'view-extent-undo',
            RESET: 'view-extent-reset',
            REDO: 'view-extent-redo',
            ZOOM_IN: 'view-zoom-in',
            ZOOM_OUT: 'view-zoom-out'
        }
    };
});