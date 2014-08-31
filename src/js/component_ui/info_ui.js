var flight = require('../lib/flight');
var withCanvas = require('../mixin/with_hogan.js');

module.exports = flight.component(infoUI, withCanvas);

function infoUI() {
  this.attributes({
    'template': require('../../../templates/sector/_system_info.mustache')
  });

  this.after('initialize', function() {
    this.on(document, 'uiRenderSystem', this.render);
    this.on(document, 'uiRenderStars', this.render);
  });
}
