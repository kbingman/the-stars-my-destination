var $ = require('jquery');
var flight = require('./lib/flight');
var System = require('./lib/accrete');

/**
 * Expose Globals
 */
window.$ = $;
window.System = System;

/**
 * Loads Flight components
 */

var defaultPage = require('./pages/default.js');

flight.debug.enable(true);
flight.compose.mixin(flight.registry, [flight.advice.withAdvice, flight.logger]);
DEBUG.events.logAll();

/**
 * Sets up the default components
 */
defaultPage.init();
