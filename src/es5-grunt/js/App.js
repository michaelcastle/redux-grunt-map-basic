/*
 * This class is used to load up the initialise the map.
 * 
 * @module js/App
 */
define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/promise/all',

    'esri/Map',
    'esri/views/MapView',
    'esri/core/promiseUtils',
    'app/state/observer', // redux
    'app/widgets/WidgetController' // widgets
], function (declare, lang, all, Map, MapView, promiseUtils, observer, WidgetController) {

    return declare([], {

        config: {},
        map: null,
        view: null,
        observer: null,

        constructor: function (config) {
            lang.mixin(this.config, config);

            this.observer = observer;
            observer.store.dispatch(observer.map.actions.loading(true));
            
            this.initaliseMap();
            this.initialiseWidgets();

            this.view
                .then(this.afterInit.bind(this))
                .otherwise(this.afterInitError.bind(this));
        },

        afterInit: function () {
            observer.store.dispatch(observer.map.actions.loading(false));
            return promiseUtils.resolve();
        },

        afterInitError: function (ex) {
            observer.store.dispatch(observer.map.actions.loading(false));
            console.error(ex);
            return promiseUtils.resolve();
        },

        initaliseMap: function () {
            this.map = new Map(this.config.map);

            var options = {
                map: this.map
            };
            lang.mixin(options, this.config.view);

            this.view = new MapView(options);
        },

        initialiseWidgets: function () {
            this.widgets = new WidgetController({
                map: this.map,
                view: this.view
            });
        }
    });
});

