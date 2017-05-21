define([
    'vendor/Redux/redux.min',
    './appReducer',
    './middleware/logger',
    'vendor/ReduxThunk/redux-thunk.min'
], function (redux, appReducer, logger, reduxThunk) {

    var middleware = redux.applyMiddleware(logger.logActions);
    var thunk = redux.applyMiddleware(reduxThunk.default);
    var store = redux.createStore(appReducer, middleware, thunk);

    return store;
});
