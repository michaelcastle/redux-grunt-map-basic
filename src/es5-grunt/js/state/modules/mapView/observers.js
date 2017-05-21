define([
    './selectors',
    'vendor/Rx/rx.all',
    './comparers'
], function (selectors, Rx, comparers) {
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
        if (!keySelector) {
            keySelector = function (state) {
                return state;
            };
        }
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
            var extentSelector = function (state) {
                var extent = selectors.extent(state);
                if (!extent || isNaN(extent)) return;
                return state;
            };
            var comparer = function (viewA, viewB) {
                return comparers.extentComparer(viewA, viewB) && !comparers.rotationComparer(viewA, viewB) && !comparers.zoomComparer(viewA, viewB);
            };
            return subscribe(store, next, selectors.view, extentSelector, comparer);
        },
        zoom: function (store, next) {
            var zoomSelector = function (state) {
                var zoom = selectors.zoom(state);
                if (!zoom || isNaN(zoom)) return;
                return state;
            };
            var comparer = function (viewA, viewB) {
                return !comparers.extentComparer(viewA, viewB) && !comparers.rotationComparer(viewA, viewB) && comparers.zoomComparer(viewA, viewB);
            };
            return subscribe(store, next, selectors.view, zoomSelector, comparer);
        },
        rotation: function (store, next) {
            var rotationSelector = function (state) {
                var rotation = selectors.rotation(state);
                if (!rotation || isNaN(rotation)) return;
                return state;
            };
            var comparer = function (viewA, viewB) {
                return !comparers.extentComparer(viewA, viewB) && comparers.rotationComparer(viewA, viewB) && !comparers.zoomComparer(viewA, viewB);
            };
            return subscribe(store, next, selectors.view, rotationSelector, comparer);
        }
    };

    return observe;
});