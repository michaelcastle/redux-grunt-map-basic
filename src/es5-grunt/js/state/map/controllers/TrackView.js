/**
 * This widget is used to control the back button
 * 
 * @module js/widgets/Back
 */
define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'esri/core/Collection',
    'esri/core/watchUtils',

    // redux
    '../actions',
    '../observers'
], function (declare, lang, Collection, watchUtils, actions, observers) {

    return declare([], {

        pauseTracking: false,
        store: null,
        view: null,

        constructor: function (store, view) {
            this.store = store;
            this.view = view;

            this.extents = new Collection();

            observers.back(store, lang.hitch(this, this.back));
            watchUtils.when(this.view, 'stationary', lang.hitch(this, this.extentChange));
        },

        /**
         * When the map extent is changed then this function creates a copy of the extent and saves it in an array
         */
        extentChange: function () {
            try {
                if (this.view.extent && !this.pauseTracking) {
                    this.store.dispatch(actions.changeExtent(this.view));
                }
                this.pauseTracking = false;
            } catch (e) { 
                console.error(e);
            }
        },

        /**
         * This will reset the back cache
         */
        reset: function () {
            //this.extents = [];
        },

        /**
         * When the back is invoked then this function will goTo the last extent in the list and remove it from the cache
         */
        back: function (view) {
            try {
                this.pauseTracking = true;
                /*var options;

                if (view.type === '3d') {
                    options = {
                        viewpoint: view.viewpoint
                    };
                } else {
                    options = view.extent;
                }*/
                this.view.goTo(view.viewpoint);
            } catch (e) { 
                console.error(e);
            } finally {
                //mapEvents.OnNRMBack();
            }
        }
    });
});