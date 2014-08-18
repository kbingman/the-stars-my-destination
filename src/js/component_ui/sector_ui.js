var flight = require('../../../node_modules/flight-umd/flight');
var withCanvas = require('../mixin/with_canvas.js');

module.exports = flight.component(withCanvas, sectorUI);

function sectorUI() {
  this.attributes({
    scale: null
  });

  this.setup = function(){
    this.attr.context = this.node.getContext('2d');
  };

  this.render = function(e, data){
    this.clear();
    data.systems.forEach(function(system){
      var star = system.stars[0];
      this.disk(system.x * this.attr.scale, system.y * this.attr.scale,
        Math.sqrt(star.radius) * this.attr.scale / 8, star.color);
    }, this);
    this.on('click', this.showSector);
  };

  this.stopListeningToClicks = function(){
    this.off('click');
  };

  this.showSector = function(e){
    this.trigger('needsSystemData', {
      x: Math.round(e.pageX) / this.attr.scale,
      y: Math.round(e.pageY) / this.attr.scale
    });
  };

  this.after('initialize', function() {
    this.setup();
    this.on(document, 'uiRenderStars', this.render);
    this.on(document, 'uiRenderSystem', this.stopListeningToClicks);
  });
}
