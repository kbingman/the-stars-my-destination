var templates = require('../templates');
var flight = require('../lib/flight');
var Hogan = require('hogan')

module.exports = withHogan;

function withHogan() {

  this.render = function(e, data) {
    var utils = {
      'round': function() {
        return function(text, render) {
          return text;
        };
      }
    };
    var context = flight.utils.merge(utils, data);
    this.$node.html(templates[this.attr.template].render(context));
  };

}
