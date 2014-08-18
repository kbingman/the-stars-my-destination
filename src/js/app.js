var $ = require('jquery');
var flight = require('../../node_modules/flight-umd/flight');
var templates = require('./templates');
var withCanvas = require('./mixin/with_canvas');

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

// compose.mixin(registry, [advice.withAdvice, withLogging]);

/**
 * Sets up the default components
 */
defaultPage.init();
