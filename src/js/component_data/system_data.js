var flight = require('../lib/flight');
var withSystemBuilder = require('../mixin/with_system_builder.js');

module.exports = flight.component(withSystemBuilder, systemData);

function systemData() {

  this.attributes({
    system: {}
  });

  this.createSystem = function(e, data){
    this.attr.system = this.calculateSystem(data.system);

    this.trigger('uiRenderSystem', {
      system: this.attr.system
    });
  };

  this.fetchPlanet = function(e, data){
    var number = data.number;
    var planet = this.attr.system.planets[number - 1];

    this.trigger('showPlanetInfo', {
      planet: planet
    });
  };

  this.fetchSystem = function(e, data){
    this.trigger('showSystemInfo', {
      system: this.attr.system
    });
  };

  this.after('initialize', function(){
    this.on(document, 'buildSystemData', this.createSystem);
    this.on(document, 'needsPlanetInfo', this.fetchPlanet);
    this.on(document, 'needsSystemInfo', this.fetchSystem);
  });

}
