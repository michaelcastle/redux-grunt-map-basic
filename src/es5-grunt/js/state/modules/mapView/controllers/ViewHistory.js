/**
 * This widget is used to control the back button
 * 
 * @module js/widgets/Back
 */
define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'esri/core/watchUtils',

    // redux
    '../actions',
    './viewChange',
    './ViewExtent',
    './ViewZoom',
    './ViewRotation'
], function (declare, lang, watchUtils, actions, viewChange, ViewExtent, ViewZoom, ViewRotation) {

    return declare([], {

        store: null,
        view: null,
        viewExtent: null,
        viewZoom: null,
        viewRotation: null,

        constructor: function (store, view) {
            this.store = store;
            this.view = view;
            this.view.then(lang.hitch(this, function () {
                watchUtils.when(this.view, 'stationary', lang.hitch(this, this.extentChange));
            }));
            
            this.viewExtent = new ViewExtent(store, this.view);
            this.viewZoom = new ViewZoom(store, this.view);
            this.viewRotation = new ViewRotation(store, this.view);
        },

        /**
         * When the map extent is changed then this function creates a copy of the extent and saves it in an array
         */
        extentChange: function () {
            try {
                if (this.view.extent && viewChange.recordHistory) {
                    this.store.dispatch(actions.changeExtent(this.view));
                }
                viewChange.recordHistory = true;
            } catch (e) {
                console.error(e);
            }
        }
    });
});