var flight = require('../lib/flight');
var withCanvas = require('../mixin/with_hogan.js');

module.exports = flight.component(withCanvas, infoUI);

function infoUI() {
  this.attributes({
    'template': require('../../../templates/sector/_system_info.mustache'),
    'navPlanetInfo': '[data-planet]'
  });

  this.showInfo = function(e){
    e.preventDefault();
    var number = e.target.getAttribute('data-planet');
    this.trigger('needsPlanetInfo', {
      number: number
    });
  };

  this.showSystemInfo = function(e){
    e.preventDefault();
    this.trigger('needsSystemInfo');
  };

  this.after('initialize', function() {
    this.on(document, 'uiRenderSystem', this.render);
    this.on(document, 'uiRenderStars', this.render);
    this.on(document, 'showSystemInfo', this.render);
    this.on('click', {
      'navPlanetInfo': this.showInfo
    });
  });
}
