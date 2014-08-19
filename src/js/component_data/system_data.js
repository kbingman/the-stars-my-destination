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
    var rand;
    var alea = new Alea(data.system.rand);
    var starType = starTypes[data.system.stars[0].name];

    this.attr.system = data.system;
    this.attr.system.bodies = [];
    this.attr.seed = alea();
    this.attr.mass = this.attr.system.stars.reduce(function(memo, s){
        memo = memo + s.mass;
        return memo;
      }, 0);

    for (var p in starType.planets) {
      rand = alea();
      count = Math.floor((0.3 + rand) * Math.sqrt(this.attr.mass) * starType.planets[p]);
      // console.log(p, count);

      for (var i = 0; i < count; i++){
        this.attr.system.bodies.push({
          type: p
        });
      }
    }

    this.trigger('uiRenderSystem', {
      system: data.system
    });
  };

  this.after('initialize', function(){
    this.on(document, 'buildSystemData', this.createSystem);
  });

}
