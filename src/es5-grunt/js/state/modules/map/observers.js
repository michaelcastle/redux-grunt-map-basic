define([
    './selectors',
    'vendor/Rx/rx.all'
], function (selectors, Rx) {
    var subscribes = function (currentState, store, select, onChange) {
        function handleChange() {
            var nextState = select(store.getState());
            if (nextState !== currentState) {
                currentState = nextState;
                onChange(currentState);
            }
        }

        var unsubscribe = store.subscribe(handleChange);
        handleChange();
        return unsubscribe;
    };
    /*
        var toObservable = function (store) {
            return {
                subscribe: function (next) {
                    var dispose = store.subscribe(function () {
                        return next(store.getState());
                    });
                    next(store.getState());
                    return { dispose };
                }
            };
        };*/

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
    var subscribe = function (store, next, stateSelector) {
        var selector = function () {
            return stateSelector(store.getState());
        };
        var isNotNull = function (value) {
            return value !== undefined;
        };

        return storeToStateStream(store, selector)
            .filter(isNotNull)
            .distinctUntilChanged()
            .subscribe(next);
    };
    var observe = {
        loading: function (store, next) {
            return subscribe(store, next, selectors.loading);
        },
        latLong: function (store, next) {
            return subscribe(store, next, selectors.latLong);
            /*var currentState;
            return subscribe(currentState, store, selectors.latLong, onChange);*/
        },
        distance: function (store, onChange) {
            var currentState;
            return subscribes(currentState, store, selectors.distance, onChange);
        }
    };

    return observe;
});