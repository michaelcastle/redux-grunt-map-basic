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
            observers.zoom(store, lang.hitch(this, this.undo));
        },

        /**
         * When the back is invoked then this function will goTo the last extent in the list and remove it from the cache
         */
        undo: function (zoom) {
            try {
                this.connect(zoom, this.mapDispatchToProps.bind(this));
            } catch (e) {
                console.error(e);
            }
        },

        connect: function (zoom, next) {
            if (this.mapStateToProps() === zoom) return;
            next(zoom);
        },

        mapStateToProps: function () {
            if (!this.view) return null;
            return this.view.zoom;
        },

        mapDispatchToProps: function (zoom) {
            this.view.goTo({ zoom: zoom });
        }
    });
});