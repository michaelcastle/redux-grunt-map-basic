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
    '../observers'
], function (declare, lang, viewChange, actions, observers) {

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
            var isEqual = false;
            var stateProp = (this.view.type === '2d') ? state.extent : state.viewpoint.camera;
            if (comparer) {
                isEqual = comparer(this.mapPropsToState(), stateProp);
            } else {
                isEqual = this.mapPropsToState() === stateProp;
            }
            if (isEqual) return;
            this.mapActionToProps(state);
        },

        mapCompareState: function (propA, propB) {
            if (!propA) return false;
            return propA.equals(propB);
            // if (propA.type !== propB.type) return false;
            // if (propA.type === '2d') {
            //     return propA.extent.equals(propB.extent);
            // }
            // return propA.viewpoint.camera.equals(propB.viewpoint.camera); // && propA.zoom === propB.zoom && propA.rotation === propB.rotation && propA.type === propB.type && propA.viewpoint.camera.tilt === propB.viewpoint.camera.tilt;
        },

        mapPropsToState: function () {
            if (!this.view) return undefined;

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