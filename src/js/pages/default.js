/**
 * Default Page for the application
 */
var flight = require('../lib/flight');
var template = require('../../../templates/sector/map.mustache');
var sectorData = require('../component_data/sector_data.js');
var systemData = require('../component_data/system_data.js');
var sectorUI = require('../component_ui/sector_ui.js');
var systemUI = require('../component_ui/system_ui.js');
var infoUI = require('../component_ui/info_ui.js');
var router = require('../component_data/history.js');

var height = $(window).height();
var width = $(window).width();

// flight.debug.enable(true);
// DEBUG.events.logAll();

module.exports = {

  render: function(){
    $('[data-container="map"]').html(template.render({
      id: 'map',
      h: height,
      w: width
    }));
  },

  init: function() {
    this.render();
    infoUI.attachTo('[data-container="info"]');
    sectorUI.attachTo('canvas#map', { scale: 10 });
    systemUI.attachTo('canvas#map');
    sectorData.attachTo(document);
    systemData.attachTo(document);
    router.attachTo(document, {
      routes: {
        '/': 'showSectors',
        '/system/:x/:y/': 'needsSystemData'
      }
    });

  }
};
