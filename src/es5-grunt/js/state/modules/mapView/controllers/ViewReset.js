/**
 * This widget is used to control the back button
 * 
 * @module js/widgets/Back
 */
define([
    'dojo/_base/declare',
    'dojo/_base/lang',

    // redux
    '../actions',
    '../observers'
], function (declare, lang, actions, observers) {

    return declare([], {

        constructor: function (store) {
            observers.reset(store, lang.hitch(this, this.reset));
        },

        /**
         * This will reset the back cache
         */
        reset: function () {
            this.store.dispatch(actions.resetTrackView(this.view));
        }
    });
});