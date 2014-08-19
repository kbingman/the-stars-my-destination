module.exports = withCanvas;

function withCanvas() {

  this.disk = function(x, y, radius, color) {
    var context = this.attr.context;

    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI*2, true);
    context.closePath();
    context.fillStyle = color;
    context.fill();
  };

  this.circle = function(x, y, radius, color) {
    var context = this.attr.context;

    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI*2, true);
    context.closePath();
    context.fillStyle = 'transparent';
    context.strokeStyle = color;
    context.stroke();
  };

  this.clear = function(x, y) {
    this.attr.context.clearRect(0, 0, this.attr.width, this.attr.height);
  };

  this.after('initialize', function() {
    this.attr.width = $(window).width();
    this.attr.height = $(window).height();
  });

}
