var flight = require('../lib/flight');
var utils = flight.utils;
var withCanvas = require('../mixin/with_canvas.js');

module.exports = flight.component(withCanvas, systemUI);

function systemUI() {
  this.attributes({
    context: '',
    info: '.info'
  });

  this.setup = function(){
    this.attr.context = this.node.getContext('2d');
  };

  this.render = function(e, data){
    this.clear();
    var _radius = data.system.stars[0].radius;
    var _offset = (data.system.stars.length - 1) * 11 * data.system.rand * _radius;
    var _x = $(window).width() / 2;
    var _y = $(window).height() / 2;

    data.system.stars.forEach(function(star, i, stars){
      if (i % 2 ){
        _offset = _offset * -1;
      }
      this.disk(_x + _offset, _y, star.radius * 10, star.color);
    }, this);

    data.system.planets.forEach(function(planet, i){
      this.circle(_x, _y, planet.axis * 10, 'white');
      this.disk(_x + planet.axis * 10, _y, 4, 'white');
    }, this);

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
