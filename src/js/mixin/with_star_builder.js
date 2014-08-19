var starTypes = require('./with_star_types');
var flight = require('../lib/flight');
var Alea = require('alea');

module.exports = withStar;

function withStar() {

  this.attributes({
    counts: {
      'blue': 0,
      'blue-white': 0,
      'white': 0,
      'yellow-white': 0,
      'yellow': 0,
      'orange': 0,
      'red': 0
    }
  });

  this.calculateStar = function(seed) {
    var alea = new Alea(seed);
    var star = {};
    var attributes = this.setType(seed);
    star.rand = alea()
    star.radius = attributes.radius * (0.5 + star.rand);
    star.name = attributes.name;
    star.color = attributes.color;
    star.type = attributes.type;
    star.mass = attributes.mass * Math.pow((0.75 + (star.rand * 0.5)), 2);
    star.luminosity = Math.floor(star.rand * 10);

    return star;
  };

  this.setType = function(seed) {
    switch (true) {
      case seed > 0.9997:
        // this.attr.counts['blue']++;
        return starTypes['blue'];
      case seed > 0.995 && seed <= 0.9997:
        // this.attr.counts['blue-white']++;
        return starTypes['blue-white'];
      case seed > 0.97 && seed <= 0.995:
        // this.attr.counts['white']++;
        return starTypes['white'];
      case seed > 0.92 && seed <= 0.97:
        // this.attr.counts['yellow-white']++;
        return starTypes['yellow-white'];
      case seed > 0.86 && seed <= 0.92:
        // this.attr.counts['yellow']++;
        return starTypes['yellow'];
      case seed > 0.74 && seed <= 0.82:
        // this.attr.counts['orange']++;
        return starTypes['orange'];
      default:
        // this.attr.counts['red']++;
        return starTypes['red'];
    }
  };

};
