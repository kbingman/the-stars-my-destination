var flight = require('../../../node_modules/flight-umd/flight');
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

    // Get all major planets
    data.system.planets = data.system.bodies.reduce(function(memo, p){
      if (!/(cerian|kuiperian)/.test(p.type)) {
        memo.push(p);
      }
      return memo;
    }, []);

    data.system.stars.forEach(function(star, i, stars){
      if (i % 2 ){
        _offset = _offset * -1;
      }
      this.disk(_x + _offset, _y, star.radius * 10, star.color);
    }, this);

    data.system.planets.forEach(function(planet, i){
      console.log(planet);
      this.circle(_x, _y, (i + 1) * 42 * data.system.rand * _radius, 'white');
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
