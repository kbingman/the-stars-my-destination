var flight = require('../lib/flight');

module.exports = withHogan;

function withHogan(template) {

  this.render = function(e, data) {

    var template = this.attr.template;
    var renderer = function(context) {
        return function(text) {
            return template.c.compile(text, template.options).render(context);
        };
    };

    var utils = {
        round: function(){
            return function(text){
                var render = renderer(this);
                var value = parseFloat(render(text)).toFixed(3);
                return value;
            }
        }
    };
    var context = flight.utils.merge(utils, data);

    this.$node.html(template.render(context));
  };

}
