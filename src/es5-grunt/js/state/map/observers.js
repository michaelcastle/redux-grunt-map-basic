define([
    './selectors'
], function (selectors) {
    var subscribe = function (currentState, store, select, onChange) {
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
    var stateless = function (currentState, store, select, onChange) {
        function handleChange() {
            var storeState = store.getState();
            var nextState = select(storeState);
            if (currentState === undefined) currentState = nextState;
            if (nextState !== currentState) {
                currentState = nextState;
                onChange(storeState.extent.present);
            }
        }

        var unsubscribe = store.subscribe(handleChange);
        handleChange();
        return unsubscribe;
    };
    var observe = {
        loading: function (store, onChange) {
            var currentState;
            return subscribe(currentState, store, selectors.loading, onChange);
        },
        latLong: function (store, onChange) {
            var currentState;
            return subscribe(currentState, store, selectors.latLong, onChange);
        },
        distance: function (store, onChange) {
            var currentState;
            return subscribe(currentState, store, selectors.distance, onChange);
        },
        back: function (store, onChange) {
            var currentState;
            return stateless(currentState, store, selectors.back, onChange);
        }
    };

    return observe;
});