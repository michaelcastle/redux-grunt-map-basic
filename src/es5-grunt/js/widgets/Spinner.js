/**
 * This widget is initialise the widgets and display them
 * 
 * @module js/widgets/Spinner
 */
define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'app/state/appStore',
    'app/state/map/controllers/Spinner'
], function (declare, lang, store, SpinnerController) {

    return declare([], {

        spinner: null,

        constructor: function (options) {
            lang.mixin(this, options);
            this.addSpinner();
        },

        addSpinner: function () {
            this.spinner = new SpinnerController(store, '');
        }
    });
});
