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
    './viewChange'
], function (declare, lang, watchUtils, actions, viewChange) {

    return declare([], {

        store: null,
        view: null,

        constructor: function (store, view) {
            this.store = store;
            this.view = view;
            this.view.then(lang.hitch(this, function () {
                watchUtils.when(this.view, 'stationary', lang.hitch(this, this.extentChange));
            }));
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