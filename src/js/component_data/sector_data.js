FUZZINESS = 4;
BASE_THRESHOLD = 64;
BINARY_FREQ = 1; //0.50;
TRINARY_FREQ = 1; //0.88;

var flight = require('../lib/flight');
var withStarBuilder= require('../mixin/with_star_builder.js');
var withUtils = require('../mixin/with_utils.js')

var Perlin = require('proc-noise');
var Alea = require('alea');

module.exports = flight.component(withUtils, withStarBuilder, sectorData);

function sectorData() {
  this.attributes({
    systems: [],
    width: 128,
    height: 80
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
    // if (systems.length === 1){
    this.trigger('buildSystemData', {
      system: systems[0]
    });
    // }
  };

  this.calcSystems = function() {
    var random;
    var seed;

    var width = this.attr.width;
    var height = this.attr.height;
    var depth = this.attr.height;

    if (!this.attr.systems.length) {
      var perlin = new Perlin(123456);
      var alea = new Alea(100100);
      var noiseScale = 0.108;

      this.attr.start = +new Date();

      perlin.noiseDetail(2, 0.00014);

      for (var i = 0; i < width; i++){
        for (var j = 0; j < height; j++){
          for (var k = 0; k < depth; k++){
            random = alea();
            seed = perlin.noise(i * noiseScale, j * noiseScale);
            if (seed > random * BASE_THRESHOLD){
              this.attr.systems.push(this.setSystem(i, j, k, seed));
            }
          }
        }
      }
      console.log(this.attr.systems.length);
      // this.logger();

      console.log(+new Date() - this.attr.start + 'ms');

      console.log('red', this.attr.systems.filter(function(s){
        return s.stars[0].type === 'M';
      }).length);
      console.log('orange', this.attr.systems.filter(function(s){
        return s.stars[0].type === 'K';
      }).length);
      console.log('yellow', this.attr.systems.filter(function(s){
        return s.stars[0].type === 'G';
      }).length);
      console.log('yellow-white', this.attr.systems.filter(function(s){
        return s.stars[0].type === 'F';
      }).length);
      console.log('white', this.attr.systems.filter(function(s){
        return s.stars[0].type === 'A';
      }).length);
      console.log('blue-white', this.attr.systems.filter(function(s){
        return s.stars[0].type === 'B';
      }).length);
      console.log('blue', this.attr.systems.filter(function(s){
        return s.stars[0].type === 'O';
      }).length);
    }

    this.trigger(document, 'uiRenderStars', {
      systems: this.attr.systems,
      x: 0,
      y: 0
    });
  };

  this.setSystem = function(i, j, k, seed){
    var a = new Alea(seed);
    var rand = a();
    var system = {
      x: this.round((a() * 3) + i - 1, 5),
      y: this.round((a() * 3) + j - 1, 5),
      z: this.round((a() * 3) + k - 1, 5),
      rand: rand,
      stars: []
    };

    system.stars.push(this.calculateStar(rand));

    if (a() > BINARY_FREQ) {
      system.stars.push(this.calculateStar(rand * a()));
    }

    if (a() > TRINARY_FREQ) {
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
