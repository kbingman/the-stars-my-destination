var flight = require('../lib/flight');
var withCanvas = require('../mixin/with_canvas.js');

module.exports = flight.component(withCanvas, statsUI);

function statsUI() {
  this.attributes({
  });

  this.setup = function(){
    this.attr.context = this.node.getContext('2d');
  };

  this.render = function(e, data){
    // console.log(data)
    var systems = data.systems;
    var terrestrialPlanets = data.terrestrialPlanets;

    console.log(data.terrestrialPlanets);
    this.clear();
    data.terrestrialPlanets.forEach(function(p){
      console.log('hey')
      this.disk(p.surfaceTemperature + this.attr.width / 2, this.attr.height - 50 - p.surfacePressure * 10, p.mass, 'white');
    }, this);
  }

  this.after('initialize', function() {
    this.setup();
    this.on(document, 'uiShowStats', this.render);
  });
}
