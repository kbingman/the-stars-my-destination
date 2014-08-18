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
    var offset = (data.system.stars.length - 1) * 21 * data.system.rand * data.system.stars[0].radius;
    data.system.stars.forEach(function(star, i, stars){
      if (i % 2 ){
        offset = offset * -1;
      }
      var x = (this.attr.width / 2) + offset;
      var y = (this.attr.height / 2);
      this.disk(x, y, star.radius * 10, star.color);
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
