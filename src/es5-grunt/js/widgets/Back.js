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
    'app/state/modules/mapView/controllers/ViewUndo'
], function (declare, lang, store, ViewHistory, ViewUndo) {

    return declare([], {

        view: null,
        viewHistory: null,

        constructor: function (options) {
            lang.mixin(this, options);
            this.addBack();
        },

        addBack: function () {
            this.viewHistory = new ViewHistory(store, this.view);
            this.viewUndo = new ViewUndo(store, this.view);
        }
    });
});
