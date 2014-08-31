var $ = require('jquery');
var flight = require('./lib/flight');

/**
 * Expose Globals
 */
window.$ = $;

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
