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
    'dojo/domReady!'
], function (declare, lang, Toc, Spinner, Back) {

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
        }
    });
});
