/**
 * This widget is initialise the widgets and display them
 * 
 * @module js/widgets/Back
 */
define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'app/state/appStore',
    'app/state/map/controllers/TrackView'
], function (declare, lang, store, TrackView) {

    return declare([], {

        spinner: null,
        view: null,
        back: null,

        constructor: function (options) {
            lang.mixin(this, options);
            this.addBack();
        },

        addBack: function () {
            this.back = new TrackView(store, this.view);
        }
    });
});
