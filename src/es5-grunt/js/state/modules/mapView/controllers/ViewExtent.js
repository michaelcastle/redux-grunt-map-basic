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
            if (comparer) {
                isEqual = comparer(this.mapPropsToState(), state);
            } else {
                isEqual = this.mapPropsToState() === state;
            }
            if (isEqual) return;
            this.mapActionToProps(state);
        },

        mapCompareState: function (propA, propB) {
            if (!propA) return false;
            return propA.extent.equals(propB.extent) && propA.zoom === propB.zoom && propA.rotation === propB.rotation && propA.type === propB.type;
        },

        mapPropsToState: function () {
            if (!this.view) return undefined;
            return actions.changeExtent(this.view).payload;
        },

        // app.view.goTo(app.state.store.getState().view.present)        
        mapActionToProps: function (view) {
            viewChange.goTo(this.view, view);
        }
    });
});