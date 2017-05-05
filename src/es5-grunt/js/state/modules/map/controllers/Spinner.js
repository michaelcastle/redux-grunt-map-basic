/**
 * This widget is used to control the spinner and knows when to turn it on and off
 * 
 * @module js/widgets/Spinner
 */
define([
    'dojo/_base/declare',
    'dojo/dom',
    '../observers'
], function (declare, dom, observers) {

    return declare([], {

        processCount: 0,
        spinnerDiv: '',

        constructor: function (store, spinnerDiv) {
            this.spinnerDiv = spinnerDiv;
            observers.loading(store, this.handleEvent.bind(this));
        },

        handleEvent: function (visible) { 
            if (visible) {
                this.open();
            } else {
                this.close();
            }
        },

        open: function (ms) {
            if (!this.isLoading()) {
                dom.byId(this.spinnerDiv).style.display = 'block';
            }
            this.addProcess();
            if (!ms) {
                ms = 25000;
            }
            if (ms) {
                this.timeout(ms);
            }
        },

        timeout: function(ms) {
            var self = this;
            setTimeout(function() {
                self.close();
            }, ms);
        },

        close: function () {
            if (this.isLoading()) {
                this.removeProcess();
            }
            if (!this.isLoading()) {
                dom.byId(this.spinnerDiv).style.display = 'none';
            }
        },

        kill: function () {
            if (this.isLoading()) {
                this.processCount = 0;
            }
        },

        addProcess: function () {
            this.processCount += 1;
        },

        removeProcess: function () {
            if (this.processCount > 0) {
                this.processCount -= 1;
            }
        },

        isLoading: function () {
            return this.processCount !== 0;
        }
    });
});