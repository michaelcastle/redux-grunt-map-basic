var app = {};

/**
 * The global dojo map application. 
 * Handles the starting of the dojo map code and initialises some globals 
 * @module js/boot
 */
require([
    'app/App',
    'dojo/_base/json',
    'dojo/text!config/default.json',
    'dojo/domReady!'
], function (App, dojoJson, options) {
    app = new App(dojoJson.fromJson(options));
});
