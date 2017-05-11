define([
    'dojo/_base/lang',
    './selectors',
    'vendor/Rx/rx.all'
], function (lang, selectors, Rx) {
/*    var subscribes = function (currentState, store, select, onChange) {
        function handleChange() {
            var nextState = select(store.getState());
            if (currentState === undefined) {
                currentState = nextState;
            }
            if (nextState.toString() !== currentState.toString()) {
                currentState = nextState;
                onChange(currentState);
            }
        }

        var unsubscribe = store.subscribe(handleChange);
        handleChange();
        return unsubscribe;
    };
    var addLayer = function (currentState, store, select, onChange) {
        function handleChange() {
            var nextState = select(store.getState());
            if (currentState === undefined) {
                currentState = nextState;
            }
            if (nextState.order.length !== currentState.order.length) {
                currentState = nextState;
                onChange(currentState);
            }
        }

        var unsubscribe = store.subscribe(handleChange);
        handleChange();
        return unsubscribe;
    };
    var item = function (currentState, store, select, id, onChange) {
        function handleChange() {
            var nextState = select(store.getState(), id);
            if (currentState === undefined) {
                currentState = nextState;
            }
            if (nextState !== currentState) {
                currentState = nextState;
                onChange(id, currentState);
            }
        }

        var unsubscribe = store.subscribe(handleChange);
        handleChange();
        return unsubscribe;
    };
    var itemClear = function (currentState, store, select, id, onChange) {
        function handleChange() {
            var nextState = select(store.getState(), id);
            if (currentState === undefined) {
                currentState = nextState;
            }
            if (nextState !== currentState) {
                currentState = nextState;
                if (nextState === false) {
                    onChange(id, currentState);
                }
            }
        }

        var unsubscribe = store.subscribe(handleChange);
        handleChange();
        return unsubscribe;
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
    var subscribe = function (store, next, selector) {
        var isNotNull = function (value) {
            return value !== undefined;
        };
        return storeToStateStream(store, selector)
            .filter(isNotNull)
            .distinctUntilChanged()
            .subscribe(next);
    };
    var subscribeById = function (store, next, selector) {
        return storeToStateStream(store)
            .filter(function (value) { return !!value; })
            .distinctUntilChanged(selector)
            .subscribe(next);
    };
    var selectorById = function (store, selector, id) {
        return function () {
            return selector(store.getState(), id);
        };
    };
    var selector = function (store, selector) {
        return function () {
            return selector(store.getState());
        };
    };

    var observe = {
        layerVisibility: function (store, id, next) {
            /*var currentState;
            return item(currentState, store, selectors.layerVisibility, id, onChange);*/
            return subscribeById(store, next, selectorById(store, selectors.layerVisibility, id));
        },
        layerOpacity: function (store, id, next) {
            /*var currentState;
            return item(currentState, store, selectors.layerOpacity, id, onChange);*/
            return subscribeById(store, next, selectorById(store, selectors.layerOpacity, id));
        },
        layerClear: function (store, id, next) {
            /*var currentState;
            return itemClear(currentState, store, selectors.layerClear, id, next);*/
            return subscribeById(store, next, selectorById(store, selectors.layerClear, id));
        },
        layerOrder: function (store, next) {
            return subscribe(store, next, selector(store, selectors.tocOrder));
            /*var currentState;
            return subscribes(currentState, store, selectors.tocOrder, next);*/
        },
        toc: function (store, next) {
            return subscribe(store, next, selector(store, selectors.toc));
            /* var currentState;
             return addLayer(currentState, store, selectors.toc, onChange);*/
        }
    };

    return observe;
});