define([
    './selectors',
    'vendor/Rx/rx.all'
], function (selectors, Rx) {
    var storeToStateStream = function (store, selector) {
        var removeHandler = function (handler, unsubscribe) {
            return unsubscribe();
        };

        return new Rx.Observable.fromEventPattern(
            store.subscribe,
            removeHandler,
            selector
        );
    };
    var subscribe = function (store, next, stateSelector, keySelector, viewComparer) {
        var selector = function () {
            return stateSelector(store.getState());
        };
        var isNotNull = function (value) {
            return value !== undefined;
        };

        return storeToStateStream(store, selector)
            .filter(isNotNull)
            .distinctUntilChanged(keySelector, viewComparer)
            .subscribe(next);
    };


    var observe = {
        /*distance: function (store, onChange) {
            var currentState;
            return subscribe(currentState, store, selectors.distance, onChange);
        },*/
        extent: function (store, next) {
            var keySelector = function (view) {
                if (!view) return view;
                return view.extent;
            };
            var viewComparer = function (viewA, viewB) {
                if (!viewA) return false;
                return viewA.equals(viewB);
            };
            return subscribe(store, next, selectors.extent, keySelector, viewComparer);
        },
        zoom: function (store, next) {
            return subscribe(store, next, selectors.zoom);
        }
    };

    return observe;
});