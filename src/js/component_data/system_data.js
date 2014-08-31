var flight = require('../lib/flight');
var starTypes = require('../mixin/with_star_types.js');
var planetTypes = require('../mixin/with_planet_types.js');
// var withPlanetBuilder= require('../mixin/with_star_builder.js');

var Perlin = require('proc-noise');
var Alea = require('alea');
var System = require('../lib/accrete');

window.System = System

module.exports = flight.component(systemData);

function systemData() {

  this.attributes({
    stars: [],
    system: {}
  });

  this.createSystem = function(e, data){
    var count = 0;
    var alea = new Alea(data.system.rand);
    var rand = alea();
    var starType = starTypes[data.system.stars[0].name];


    this.attr.system = data.system;
    this.attr.system.bodies = [];
    this.attr.seed = alea();
    this.attr.system.mass = this.attr.system.stars.reduce(function(memo, s){
        memo = memo + s.mass;
        return memo;
      }, 0);

    // Create planets
    // console.log(rand * 10e16);
    var generator = new System(rand * 10e16);
    var accrete = generator.distributePlanets(this.attr.system.mass);

    // console.log(accrete);

    // Get all major planets
    this.attr.system.planets = accrete.planets.map(function(p){
        // console.log(p)
        return p;
    });

    this.trigger('uiRenderSystem', {
      system: data.system
    });
  };

  this.after('initialize', function(){
    this.on(document, 'buildSystemData', this.createSystem);
  });

}
