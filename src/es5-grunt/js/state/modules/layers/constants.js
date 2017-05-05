// Actions: Name them them <noun>-<verb>, eg Project-Create, User-Login. 
//The rationale behind this is that you want them grouped together by the object type, rather than the action type.
define([
], function () {
    return {
        actionTypes: {
            LAYER_VISIBILITY: 'layers-set-visibility',
            LAYER_OPACITY: 'layers-set-opacity',
            LAYER_CLEAR: 'layers-clear',
            REORDER: 'layers-reorder',
            LAYER_CONTAINS_FEATURES: 'layers-contains-features',
            LAYERS_ADD: 'layers-add',
            LAYERS_REMOVE: 'layers-remove'
        }
    };
});