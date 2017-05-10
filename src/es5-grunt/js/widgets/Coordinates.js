/**
 * This widget is initialise the widgets and display them
 * 
 * @module js/widgets/Spinner
 */
define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'app/state/appStore',
    'app/state/modules/map/controllers/Coordinates'
], function (declare, lang, store, Coordinates) {

    return declare([], {

        coordinates: null,
        view: null,

        constructor: function (options) {
            lang.mixin(this, options);
            this.addCoordinates();
        },

        addCoordinates: function () {
            this.coordinates = new Coordinates(store, this.view);
        }
    });
});
