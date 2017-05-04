// Actions: Name them them <noun>-<verb>, eg Project-Create, User-Login. 
//The rationale behind this is that you want them grouped together by the object type, rather than the action type.
define([
], function () {
    return {
        actionTypes: {
            LOADING: 'map-loading',
            LAT_LONG_UPDATE: 'map-latlong-update',
            DISTANCE_UPDATE: 'map-distance-update',
            DISTANCE_CLEAR: 'map-distance-clear',
            UPDATE_EXTENT: 'map-extent-update',
            BACK: 'map-extent-back'
        }
    };
});