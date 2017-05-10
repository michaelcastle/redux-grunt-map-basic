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

        return storeToStateStream(store, selector)
            .distinctUntilChanged(keySelector, viewComparer)
            .subscribe(next);
    };


    var observe = {
        distance: function (store, onChange) {
            var currentState;
            return subscribe(currentState, store, selectors.distance, onChange);
        },
        viewChange: function (store, next) {

            var viewComparer = function (viewA, viewB) {
                if (!viewA) return false;
                return viewA.equals(viewB);
            };
            var keySelector = function (view) {
                if (!view) return view;
                return view.extent;
            };
            return subscribe(store, next, selectors.view, keySelector, viewComparer);

            // var currentState;
            // return stateless(currentState, store, selectors.back, onChange);
        }
    };

    return observe;
});