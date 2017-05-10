/**
 * This widget is initialise the widgets and display them
 * 
 * @module js/widgets/WidgetController
 */
define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'app/widgets/Toc',
    'app/widgets/Spinner',
    'app/widgets/Back',
    'app/widgets/Coordinates'
], function (declare, lang, Toc, Spinner, Back, Coordinates) {

    return declare([], {

        view: null,
        map: null,
        spinner: null,
        toc: null,
        back: null,

        constructor: function (options) {
            lang.mixin(this, options);
            this.addWidgets();
        },

        addWidgets: function () {
            this.addSpinner();
            this.addToc();
            this.addBack();
            this.addCoordinates();
        },

        addSpinner: function () {
            this.spinner = new Spinner();
        },

        addToc: function () {
            this.toc = new Toc({
                map: this.map
            });
        },

        addBack: function () {
            this.back = new Back({
                view: this.view
            });
        },

        addCoordinates: function () {
            this.coordinates = new Coordinates({ view: this.view });
        }
    });
});
