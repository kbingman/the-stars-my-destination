FUZZINESS = 4;
BASE_THRESHOLD = 0.5;
var flight = require('../../../node_modules/flight-umd/flight');
var withStarBuilder= require('../mixin/with_star_builder.js');
var withUtils = require('../mixin/with_utils.js')

var Perlin = require('proc-noise');
var Alea = require('alea');

module.exports = flight.component(withUtils, withStarBuilder, sectorData);

function sectorData() {
  this.attributes({
    systems: [],
    width: 128,
    height: 72
  });

  this.findSystem = function(e, data){
    var fuzziness = FUZZINESS / 8;
    var x = parseFloat(data.x);
    var y = parseFloat(data.y);

    var systems = this.attr.systems.filter(function(system) {
      return system.x > x - fuzziness &&
        system.x < x + fuzziness &&
        system.y > y - fuzziness &&
        system.y < y + fuzziness;
    });

    console.log(systems);
    if (systems.length === 1){
      this.trigger('buildSystemData', {
        system: systems[0]
      });
    }
  };

  this.calcSystems = function() {
    var random;
    var seed;

    var width = this.attr.width;
    var height = this.attr.height;

    if (!this.attr.systems.length) {
      var perlin = new Perlin(123456);
      var alea = new Alea(100100);
      var noiseScale = 0.108;

      this.attr.start = +new Date();

      perlin.noiseDetail(2, 0.00014);

      for (var i = 0; i < width; i++){
        for (var j = 0; j < height; j++){

          random = alea();
          seed = perlin.noise(i * noiseScale, j * noiseScale);
          if (seed > random * BASE_THRESHOLD){
            this.attr.systems.push(this.setSystem(i, j, seed));
          }

        }
      }
      console.log(this.attr.systems.length);
      // this.logger();
    }

    this.trigger(document, 'uiRenderStars', {
      systems: this.attr.systems
    });
  };

  this.setSystem = function(i, j, seed){
    // console.log(i,j,seed)
    var a = new Alea(seed);
    var rand = a()
    var system = {
      x: this.round((a() * 3) + i - 1, 5),
      y: this.round((a() * 3) + j - 1, 5),
      rand: rand,
      stars: []
    };

    system.stars.push(this.calculateStar(rand));

    if (rand > 0.90) {
      system.stars.push(this.calculateStar(rand * a()));
    }

    return system;
  };

  this.after('initialize', function() {
    this.on(document, 'needsSystemData', this.findSystem);
    this.on(document, 'showSectors', this.calcSystems);
    this.calcSystems();
  });
}
