var flight = require('../lib/flight');
var Alea = require('alea');
var System = require('../lib/accrete');

module.exports = withSystemBuilder;

function withSystemBuilder() {

  this.calculateSystem = function(system){
    var generator, accrete;

    system.mass = system.stars.reduce(function(memo, s){
        memo = memo + s.mass;
        return memo;
      }, 0);

    // Create planets
    generator = new System(system.rand * 10e16);
    accrete = generator.distributePlanets(system.mass);

    system.planets = accrete.planets;
    system.star = accrete.star;

    return system
  };

};
