/**
 * This widget is used to control the lat long widget and display it on the map
 * 
 * @module js/widgets/LatLong
 */
define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Stateful',
    'esri/geometry/ScreenPoint',
    'dojo/on',
    // redux
    '../actions'
    /*'app/redux/appStore',
    'app/redux/connect/uiObserver',*/
], function (declare, lang, Stateful, ScreenPoint, on, actions /*appStore, uiObserve*/) {
    return declare([Stateful], {

        view: null,
        coordOptions: 'dms', // dd || dms
        store: null,

        constructor: function (store, view) {
            this.store = store;
            this.view = view;
            if (this.config) {
                this.coordOptions = this.config.coordinateOptions.latLong;
            }

            //LatLong Model
            /*if (!isMobile) {*/
            on(this.view.container, 'mousemove', lang.hitch(this, this.onMouseMove));
            //on(this.view.container, 'mousedrag', lang.hitch(this, this.OnNRMMouseMove));
            // }

            /*uiObserve.coordOptions(appStore, this.setCoordOptions.bind(this));*/
        },

        // setCoordOptions: function (value) {
        //     this.coordOptions = value;
        // },

        onMouseMove: function (evt) {
            if (!evt) {
                return;
            }
            var screenPoint = new ScreenPoint({
                x: evt.offsetX,
                y: evt.offsetY
            });
            var point = this.view.toMap(screenPoint);
            if (!point || !point.longitude) { return; }
            var dms = this.convertLatLongToDMS(point.latitude, point.longitude);

            if (point !== null) {
                this.store.dispatch(actions.coordinatesUpdate(dms.x, dms.y, dms.latitude, dms.longitude));
            }
        },

        convertDDToDMS: function (D, lng) {
            var calculations = {
                dir: D < 0 ? lng ? 'W' : 'S' : lng ? 'E' : 'N',
                deg: 0 || (D < 0 ? D = -D : D).toFixed(0),
                min: 0 || (D % 1 * 60).toFixed(0),
                sec: (0 || (D * 60 % 1 * 6000) / 100).toFixed(0)
            };
            return lang.mixin(calculations, {
                toString: calculations.deg + '° ' + calculations.min + '\' ' + calculations.sec + '" ' + calculations.dir
            });
        },

        convertLatLongToDMS: function (latitude, longitude) {
            var x = this.convertDDToDMS(latitude, false);
            var y = this.convertDDToDMS(longitude, true);
            return {
                x: x,
                y: y,
                toString: x.toString + ' ' + y.toString,
                latitude: x.toString,
                longitude: y.toString
            };
        }
    });
});

