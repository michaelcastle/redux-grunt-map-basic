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
            var viewComparer = function (viewA, viewB) {
                if (!viewA) return false;
                return viewA.extent.equals(viewB.extent) && viewA.zoom === viewB.zoom && viewA.rotation === viewB.rotation && viewA.type === viewB.type && viewA.viewpoint.camera && viewA.viewpoint.camera.equals(viewB.viewpoint.camera);
            };
            return subscribe(store, next, selectors.extent, false, viewComparer);
        },
        zoom: function (store, next) {
            var zoomComparer = function (viewA, viewB) {
                if (viewA.type !== '2d') return true;
                return viewA.zoom === viewB.zoom;
            };
            return subscribe(store, next, selectors.zoom);
        },
        rotation: function (store, next) {
            return subscribe(store, next, selectors.rotation);
        }
    };

    return observe;
});