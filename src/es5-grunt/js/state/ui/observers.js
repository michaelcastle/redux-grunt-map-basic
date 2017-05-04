define([
    './selectors'
], function (selectors) {
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
    var event = function (currentState, store, select, onChange) {
        function handleChange() {
            var storeState = store.getState();
            var nextState = {
                state: select(storeState),
                count: storeState.event.count
            };
            if (currentState === undefined) currentState = {
                state: nextState,
                count: 0
            };
            if (nextState.state && nextState.count !== currentState.count) {
                currentState = nextState;
                onChange(currentState);
            }
        }

        var unsubscribe = store.subscribe(handleChange);
        handleChange();
        return unsubscribe;
    };
    var buttonClick = function (currentState, store, name, onChange) {
        function handleChange() {
            var nextState = selectors.event(store.getState());
            if (currentState === undefined) currentState = {
                state: '',
                count: 0
            };
            if (nextState.name === name && nextState.count !== currentState.count) {
                currentState = nextState;
                onChange(currentState);
            }
        }

        var unsubscribe = store.subscribe(handleChange);
        handleChange();
        return unsubscribe;
    };
    var observe = {
        buttonClick: function (store, name, onChange) {
            var currentState;
            return buttonClick(currentState, store, name, onChange);
        },
        search: function (store, onChange) {
            var currentState;
            return event(currentState, store, selectors.search, onChange);
        },
        drawUndo: function (store, onChange) {
            var currentState;
            return event(currentState, store, selectors.drawUndo, onChange);
        },
        back: function (store, onChange) {
            var currentState;
            return stateless(currentState, store, selectors.back, onChange);
        },
        reset: function (store, onChange) {
            var currentState;
            return event(currentState, store, selectors.reset, onChange);
        },
        fill: function (store, onChange) {
            var currentState;
            return stateless(currentState, store, selectors.fill, onChange);
        },
        drawClear: function (store, onChange) {
            var currentState;
            return stateless(currentState, store, selectors.drawClear, onChange);
        },
        drawRectangle: function (store, onChange) {
            var currentState;
            return stateless(currentState, store, selectors.drawRectangle, onChange);
        },
        drawArea: function (store, onChange) {
            var currentState;
            return stateless(currentState, store, selectors.drawArea, onChange);
        },
        drawLine: function (store, onChange) {
            var currentState;
            return stateless(currentState, store, selectors.drawLine, onChange);
        },
        drawCircle: function (store, onChange) {
            var currentState;
            return stateless(currentState, store, selectors.drawCircle, onChange);
        },
        zoomIn: function (store, onChange) {
            var currentState;
            return stateless(currentState, store, selectors.zoomIn, onChange);
        },
        zoomOut: function (store, onChange) {
            var currentState;
            return stateless(currentState, store, selectors.zoomOut, onChange);
        },
        compassNorth: function (store, onChange) {
            var currentState;
            return event(currentState, store, selectors.compassNorth, onChange);
        },
        home: function (store, onChange) {
            var currentState;
            return event(currentState, store, selectors.home, onChange);
        },
        coordOptions: function (store, onChange) {
            var currentState;
            return event(currentState, store, selectors.coordOptions, onChange);
        }
    };

    return observe;
});