var $ = require('jquery');
var flight = require('./lib/flight');
var templates = require('./templates');
var seedrandom = require('seedrandom');

// Global PRNG: set Math.random.
seedrandom('hello.', { global: true });

/**
 * Expose Globals
 */
window.$ = $;
window.templates = templates;

/**
 * Loads Flight components
 */

// var compose = flight.compose;
// var registry = flight.registry;
// var advice = flight.advice;
// var withLogging = flight.logger;

var defaultPage = require('./pages/default.js');

flight.debug.enable(true);
flight.compose.mixin(flight.registry, [flight.advice.withAdvice, flight.logger]);
DEBUG.events.logAll();

/**
 * Sets up the default components
 */
defaultPage.init();
