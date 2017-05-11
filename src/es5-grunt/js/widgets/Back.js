/**
 * This widget is initialise the widgets and display them
 * 
 * @module js/widgets/Back
 */
define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'app/state/appStore',
    'app/state/modules/mapView/controllers/ViewHistory',
    'app/state/modules/mapView/controllers/ViewExtent',
    'app/state/modules/mapView/controllers/ViewZoom'
], function (declare, lang, store, ViewHistory, ViewExtent, ViewZoom) {

    return declare([], {

        view: null,
        viewHistory: null,
        extent: null,
        viewZoom: null,

        constructor: function (options) {
            lang.mixin(this, options);
            this.addBack();
        },

        addBack: function () {
            this.viewHistory = new ViewHistory(store, this.view);
            this.viewExtent = new ViewExtent(store, this.view);
            this.viewZoom = new ViewZoom(store, this.view);
        }
    });
});
