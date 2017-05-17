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
    'dojo/Deferred'
], function (declare, lang, viewChange, observers, Deferred) {

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
            this.asyncProps().then(function (viewState) {
                var isEqual = false;
                if (comparer) {
                    isEqual = comparer(viewState, state);
                } else {
                    isEqual = viewState === state;
                }
                if (isEqual) return;
                this.mapActionToProps(state);
            }.bind(this));
        },

        asyncProps: function () {
            var deferred = new Deferred();
            if (!this.view) return deferred.resolve(undefined);
            if (this.view.stationary) {
                deferred.resolve(this.mapPropsToState());
            } else {
                // View is busy so we need to wait until its finished to read the zoom level for comparison
                var unwatch = this.view.watch('stationary', function () {
                    deferred.resolve(this.mapPropsToState());
                    unwatch.remove();
                }.bind(this));
            }
            return deferred.promise;
        },

        mapPropsToState: function () {
            if (!this.view) return undefined;
            return this.view.rotation;
        },

        mapActionToProps: function (rotation) {
            viewChange.deferredGoTo(this.view, { rotation: rotation });
        }
    });
});