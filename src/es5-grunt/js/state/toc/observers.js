define([
    'dojo/_base/lang',
    './selectors'
], function (lang, selectors) {
    var subscribe = function (currentState, store, select, onChange) {
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
    };
    var observe = {
        layerVisibility: function (store, id, onChange) {
            var currentState;
            return item(currentState, store, selectors.layerVisibility, id, onChange);
        },
        layerOpacity: function (store, id, onChange) {
            var currentState;
            return item(currentState, store, selectors.layerOpacity, id, onChange);
        },
        layerClear: function (store, id, onChange) {
            var currentState;
            return itemClear(currentState, store, selectors.layerClear, id, onChange);
        },
        layerOrder: function (store, onChange) {
            var currentState;
            return subscribe(currentState, store, selectors.tocOrder, onChange);
        },
        toc: function (store, onChange) {
            var currentState;
            return addLayer(currentState, store, selectors.toc, onChange);
        }
    };

    return observe;
});