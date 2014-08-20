var flight = require('../lib/flight');
var starTypes = require('../mixin/with_star_types.js');
var planetTypes = require('../mixin/with_planet_types.js');
// var withPlanetBuilder= require('../mixin/with_star_builder.js');

var Perlin = require('proc-noise');
var Alea = require('alea');

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
    // for (var p in starType.planets) {
    //
    //   count = Math.floor((0.3 + rand) * starType.planets[p] / this.attr.system.mass, 2 / this.attr.system.stars.length);
    //   // console.log(p, count);
    //
    //   for (var i = 0; i < count; i++){
    //     this.attr.system.bodies.push({
    //       type: p
    //     });
    //   }
    // }

    var jovian = Math.floor((0.8 + rand) * starType.planets['jovian'] / this.attr.system.mass / this.attr.system.stars.length);
    var neptunian = Math.floor((jovian * rand) * starType.planets['neptunian'] / this.attr.system.mass / this.attr.system.stars.length);

    for (var i = 0; i < jovian; i++){
      this.attr.system.bodies.push({
        type: 'jovian'
      });
    }

    for (var i = 0; i < neptunian; i++){
      this.attr.system.bodies.push({
        type: 'neptunian'
      });
    }
    console.log(count)
    console.log(this.attr.system.bodies)

    // Get all major planets
    this.attr.system.planets = this.attr.system.bodies.reduce(function(memo, p){
      if (!/(cerian|kuiperian)/.test(p.type)) {
        memo.push(p);
      }
      return memo;
    }, []);

    this.trigger('uiRenderSystem', {
      system: data.system
    });
  };

  this.after('initialize', function(){
    this.on(document, 'buildSystemData', this.createSystem);
  });

}
