var flight = require('../lib/flight');
var withCanvas = require('../mixin/with_hogan.js');

module.exports = flight.component(planetInfoUI, withCanvas);

function planetInfoUI() {
  this.attributes({
    'template': require('../../../templates/sector/_planet_info.mustache'),
    'navBack': '[data-back]'
  });

  this.showSystemInfo = function(e){
    e.preventDefault();
    this.trigger('needsSystemInfo');
  };

  this.after('initialize', function() {
    this.on(document, 'showPlanetInfo', this.render);
    this.on('click', {
      'navBack': this.showSystemInfo
    });
  });
}
