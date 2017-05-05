/**
 * This widget is initialise the widgets and display them
 * 
 * @module js/widgets/WidgetManager
 */
define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'app/state/appStore',
    'app/state/modules/layers/controllers/LayersController'
], function (declare, lang, store, LayersController) {

    return declare([], {

        view: null,
        map: null,
        toc: null,

        constructor: function (options) {
            lang.mixin(this, options);
            this.addToc();
        },

        addToc: function () {
            this.toc = new LayersController(store, this.map);
        }
    });
});
