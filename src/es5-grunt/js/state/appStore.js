define([
    'vendor/Redux/redux.min',
    './appReducer',
    './middleware/logger'
], function (redux, appReducer, logger) {

    var middleware = redux.applyMiddleware(logger.logActions);
    var store = redux.createStore(appReducer, middleware);

    return store;
});
