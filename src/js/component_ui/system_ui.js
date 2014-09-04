var ORBITAL_SPEED = 0.01;

var flight = require('../lib/flight');
var utils = flight.utils;
var withCanvas = require('../mixin/with_canvas.js');
var Alea = require('alea');

var _cos = 1;
var _sin = 0;

module.exports = flight.component(withCanvas, systemUI);

function systemUI() {

  this.attributes({
    context: ''
  });

  this.setup = function(){
    this.attr.context = this.node.getContext('2d');
  };

  this.draw = function(data) {
    var self = this;
    var system = data.system;
    var alea = new Alea(system.rand);
    var context = this.attr.context;

    var _radius = system.stars[0].radius;
    var _stellarOffset = (system.stars.length - 1) * 11 * system.rand * _radius;
    var _x = $(window).width() / 2;
    var _y = $(window).height() / 2;
    var _offset = system.stars[0].radius * 8;

    if (!this.attr.animationID) {
      self.attr.animationID = window.requestAnimationFrame(animate, self.node);
    }

    function animate(){
      if (self.attr.animationID){
        self.attr.animationID = window.requestAnimationFrame(animate, self.node);
      } else {
        return;
      }

      self.clear();

      self.circle(_x, _y, _offset + data.system.star.ecospherRadius * 8, 'green');

      // Static
      data.system.stars.forEach(function(star, i, stars){
        if (i % 2 ){
          _stellarOffset = _stellarOffset * -1;
        }
        self.disk(_x + _stellarOffset, _y, star.radius * 8, star.color);
      }, this);

      // Static
      data.system.planets.forEach(function(planet, i){
        var radius = planet.distanceFromPrimaryStar * 8 + _offset;
        var eccentricity = planet.eccentricity;
        var _shortRadius = radius * (1 - eccentricity);
        var centerOffset = radius - _shortRadius;

        self.circle(_x - centerOffset, _y, radius, '#444', planet.eccentricity);
      }, this);

      data.system.planets.forEach(function(planet, i){
        var xOffset = planet.distanceFromPrimaryStar * planet.eccentricity;

        planet.index = planet.index ? planet.index += ORBITAL_SPEED : alea() * 3000;
        drawPlanet(_x, _y, _offset, planet);
      }, this);
    }

    function drawPlanet(centerX, centerY, offset, planet){
      var radius = planet.distanceFromPrimaryStar * 8 + offset;
      var eccentricity = planet.eccentricity;
      var _shortRadius = radius * (1 - eccentricity);
      var centerOffset = radius - _shortRadius;

      var size = planet.gasGiant ? planet.equatorialRadius / 10000 : 2;
      var period = planet.lengthOfYear;
      var i = planet.index / period;

      var xPos = centerX - centerOffset - (radius * Math.cos(i));
      var yPos = centerY + (_shortRadius * Math.sin(i));

      // Minimum size
      size = size >= 2 ? size : 2;

      self.disk(xPos, yPos, size, 'white');
    }

  };

  this.render = function(e, data){
    var self = this;
    this.attr.system = data.system;
    this.draw(data);

    this.on('click', function(e){
        window.cancelAnimationFrame(self.attr.animationID);
        self.attr.animationID = undefined;
        self.clear();
        self.trigger(document, 'showSectors');
    });
  };

  this.stopListeningToClicks = function(){
    this.off('click');
  };

  this.after('initialize', function() {
    this.setup();
    this.on(document, 'uiRenderSystem', this.render);
    this.on(document, 'uiRenderStars', this.stopListeningToClicks);
  });
}
