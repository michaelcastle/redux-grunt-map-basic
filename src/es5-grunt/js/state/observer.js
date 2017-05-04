define([
    './appStore',
    'app/state/map/index',
    'app/state/ui/index',
    'app/state/toc/index'
], function (appStore, map, ui, toc) {

    var observer = {
        store: appStore,
        map: map,
        ui: ui,
        toc: toc
    };

    return observer;
});
