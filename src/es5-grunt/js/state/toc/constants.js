// Actions: Name them them <noun>-<verb>, eg Project-Create, User-Login. 
//The rationale behind this is that you want them grouped together by the object type, rather than the action type.
define([
], function () {
    return {
        actionTypes: {
            LAYER_VISIBILITY: 'toc-layer-set-visibility',
            LAYER_OPACITY: 'toc-layer-set-opacity',
            LAYER_CLEAR: 'toc-layer-clear',
            REORDER: 'toc-reorder',
            LAYER_CONTAINS_FEATURES: 'toc-layer-contains-features',
            ADD_LAYERS: 'toc-add-layers'
        }
    };
});