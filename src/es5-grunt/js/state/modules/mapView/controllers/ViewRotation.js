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
            observers.rotation(store, lang.hitch(this, this.handler));
        },

        /**
         * When the back is invoked then this function will goTo the last extent in the list and remove it from the cache
         */
        handler: function (state) {
            try {
                this.connect(state);
            } catch (e) {
                console.error(e);
            }
        },

        connect: function (state, comparer) {
            var isEqual = false;
            if (comparer) {
                isEqual = comparer(this.mapPropsToState(), state);
            } else {
                isEqual = this.mapPropsToState() === state;
            }
            if (isEqual) return;
            this.mapActionToProps(state);
        },

        mapPropsToState: function () {
            if (!this.view) return undefined;
            return this.view.rotation;
        },

        mapActionToProps: function (rotation) {
            setTimeout(function () {
                viewChange.goTo(this.view, { rotation: rotation });
            }.bind(this), 100);
        }
    });
});