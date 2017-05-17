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
    '../observers',
    'esri/core/promiseUtils',
    'dojo/Deferred'
], function (declare, lang, viewChange, observers, promiseUtils, Deferred) {

    return declare([], {

        view: null,

        constructor: function (store, view) {
            this.view = view;
            observers.zoom(store, lang.hitch(this, this.handler));
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

        connect1: function (state, comparer) {
            // need to return true for 3d because rotation is not used in 3d, just the viewpoint
            // if (this.view.type !== '2d') return true;
            var isEqual = false;
            if (comparer) {
                isEqual = comparer(this.mapPropsToState(), state);
            } else {
                isEqual = this.mapPropsToState() === state;
            }
            if (isEqual) return;
            this.mapActionToProps(state);
        },

        connect: function (state) {
            this.asyncProps().then(function (viewState) {
                if (viewState === state) {
                    return;
                } else {
                    this.mapActionToProps(state);
                }
            }.bind(this));
        },

        asyncProps: function () {
            var deferred = new Deferred();
            if (!this.view) return deferred.resolve(undefined);
            if (this.view.stationary) {
                deferred.resolve(this.view.zoom);
            } else {
                this.view.then(function () {
                    deferred.resolve(this.view.zoom);
                }.bind(this));
            }
            return deferred.promise;
        },

        mapPropsToState: function () {
            if (!this.view) return undefined;
            return this.view.zoom;
        },

        mapActionToProps: function (zoom) {
            viewChange.deferredGoTo(this.view, { zoom: zoom });
        }
    });
});