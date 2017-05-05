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
        }
    };

    return observe;
});