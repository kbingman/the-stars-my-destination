var flight = require('../lib/flight');
var utils = flight.utils;
var withCanvas = require('../mixin/with_canvas.js');
var Alea = require('alea')

module.exports = flight.component(withCanvas, systemUI);

function systemUI() {
  this.attributes({
    context: '',
    info: '.info'
  });

  this.setup = function(){
    this.attr.context = this.node.getContext('2d');
  };

  this.draw = function(data) {
    var self = this;
    var system = data.system;
    var alea = new Alea(system.rand);

    var _radius = system.stars[0].radius;
    var _offset = (system.stars.length - 1) * 11 * system.rand * _radius;
    var _x = $(window).width() / 2;
    var _y = $(window).height() / 2;
    var offset = system.stars[0].radius * 8;

    (function animate(){

        self.clear();
        window.requestAnimationFrame(animate);
        data.system.stars.forEach(function(star, i, stars){
          if (i % 2 ){
            _offset = _offset * -1;
          }
          self.disk(_x + _offset, _y, star.radius * 8, star.color);
        }, this);

        data.system.planets.forEach(function(planet, i){
          self.circle(_x, _y, offset + planet.distanceFromPrimaryStar * 8, '#444', planet.eccentricity);
        }, this);

        data.system.planets.forEach(function(planet, i){
          var xOffset = planet.distanceFromPrimaryStar * planet.eccentricity;

          planet.index = planet.index ? planet.index += 0.01 : alea() * 3000;
          self.drawPlanet(_x, _y, offset, planet);
        }, this);
    })();

  };

  this.drawPlanet = function(centerX, centerY, offset, planet){
       var context = this.attr.context;
       var radius = planet.distanceFromPrimaryStar * 8 + offset;
       var eccentricity = planet.eccentricity;
       var size = planet.gasGiant ? planet.equatorialRadius / 10000 : 2;
       size = size >= 2 ? size : 2;
       var period = planet.lengthOfYear;
       var i = planet.index / period;

       xPos = centerX - (radius * (1 - eccentricity)  * Math.sin(i)) * Math.sin(0 * Math.PI) + (radius * Math.cos(i)) * Math.cos(0 * Math.PI);
       yPos = centerY + (radius * Math.cos(i)) * Math.sin(0 * Math.PI) + (radius * (1 - eccentricity) * Math.sin(i)) * Math.cos(0 * Math.PI);

       this.disk(xPos, yPos, size, 'white');
  };

  this.render = function(e, data){
    this.attr.system = data.system
    this.draw(data);

    this.on('click', function(e){
      this.trigger(document, 'showSectors');
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
