/**
 * This widget is used to control the back button
 * 
 * @module js/widgets/Back
 */
define([
    'dojo/_base/declare',
    'dojo/_base/lang',

    './viewChange',
    // redux
    '../observers'
], function (declare, lang, viewChange, observers) {

    return declare([], {

        view: null,

        constructor: function (store, view) {
            this.view = view;
            observers.extent(store, lang.hitch(this, this.extent));
        },

        /**
         * When the back is invoked then this function will goTo the last extent in the list and remove it from the cache
         */
        extent: function (view) {
            try {
                if (!view || view.extent.equals(this.view.extent)) return;
                viewChange.goTo(this.view, view.viewpoint);
            } catch (e) { 
                console.error(e);
            }
        }
    });
});