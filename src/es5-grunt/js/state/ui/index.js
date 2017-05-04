define([
    './actions',
    './observers'
], function (actions, observer) {
    return {
        actions: actions,
        subscribe: observer
    };
});