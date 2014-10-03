var flight = require('../lib/flight');
var withCanvas = require('../mixin/with_hogan.js');

module.exports = flight.component(withCanvas, statsUI);

function statsUI() {
  this.attributes({
    'template': require('../../../templates/stats/index.mustache'),
    'partials': {
      planet: require('../../../templates/stats/_planet.mustache')
    }
  });

  this.after('initialize', function() {
    this.on(document, 'uiShowStats', this.render);
  });
}
