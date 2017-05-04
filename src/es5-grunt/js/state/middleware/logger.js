define([
], function () {
    var middleware = {
        logActions: function (store) {
            return function wrapDispatchToAddLogging(next) {
                return function dispatchAndLog(action) {
                    if (action.type === 'latlong-update') {
                        return next(action);
                    }
                    console.group(action.type);
                    console.info('dispatching', action);
                    var result = next(action);
                    console.log('next state', store.getState());
                    console.groupEnd(action.type);
                    return result;
                };
            };
        }
    };

    return middleware;
});