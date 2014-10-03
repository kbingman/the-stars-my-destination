var flight = require('../lib/flight');

module.exports = withHogan;

function withHogan(template) {

  this.attributes({
    // 'template': null
  });

  this.render = function(e, data) {
    var partials = this.attr.partials;

    var template = this.attr.template;
    var renderer = function(context) {
        return function(text) {
            return template.c.compile(text, template.options).render(context, partials);
        };
    };

    var utils = {
        round: function() {
            return function(text){
                var render = renderer(this);
                var value = parseFloat(render(text)).toFixed(3);
                return value;
            };
        },
        percentage: function() {
            return function(text){
                var render = renderer(this);
                var value = (parseFloat(render(text))).toFixed(0);
                return value;
            };
        },
        system: function() {
          return function(planet){
            var render = renderer(this);
            var value = render(planet);
            return value;
        };
    },
    };
    var context = flight.utils.merge(utils, data);

    this.$node.html(template.render(context, partials));
  };

}
