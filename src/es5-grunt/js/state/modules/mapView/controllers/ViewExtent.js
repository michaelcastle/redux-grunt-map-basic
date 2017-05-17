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
    '../actions',
    '../observers',
    'dojo/Deferred'
], function (declare, lang, viewChange, actions, observers, Deferred) {

    return declare([], {

        view: null,

        constructor: function (store, view) {
            this.view = view;
            observers.extent(store, lang.hitch(this, this.handler));
        },

        /**
         * When the back is invoked then this function will goTo the last extent in the list and remove it from the cache
         */
        handler: function (state) {
            try {
                this.connect(state, this.mapCompareState);
            } catch (e) {
                console.error(e);
            }
        },

        connect: function (state, comparer) {
            this.asyncProps().then(function (viewState) {
                var isEqual = false;
                var stateProp = (this.view.type === '2d') ? state.extent : state.viewpoint.camera;
                if (comparer) {
                    isEqual = comparer(viewState, stateProp);
                } else {
                    isEqual = viewState === stateProp;
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

        mapCompareState: function (propA, propB) {
            if (!propA) return false;
            return propA.equals(propB);
        },

        mapPropsToState: function () {
            if (!this.view) return undefined;

            if (!this.view.stationary) {
                console.error('not stationary!!!');
            }

            if (this.view.type === '2d') {
                return this.view.extent;
            }
            return this.view.viewpoint.camera;
            // return actions.changeExtent(this.view).payload;
        },

        mapGoToOptionsToState: function (state) {
            if (state.type === '2d') {
                return state.extent;
            }
            return state.viewpoint;
        },

        // app.view.goTo(app.state.store.getState().view.present)        
        mapActionToProps: function (state) {
            // if its 2d zoom to the extent if it has changed, otherwise zoom to the viewpoint
            viewChange.goTo(this.view, this.mapGoToOptionsToState(state));
        }
    });
});