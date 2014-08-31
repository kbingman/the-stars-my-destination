module.exports = withCanvas;

function withCanvas() {

  this.disk = function(x, y, radius, color) {
    var context = this.attr.context;

    context.save();
    context.translate(x, y);
    context.rotate(0.37);
    context.beginPath();
    context.arc(0, 0, radius, 0, Math.PI * 2, true);
    context.closePath();
    context.fillStyle = color;
    context.fill();
    context.restore();
  };

  this.circle = function(x, y, radius, color, eccentricity) {
    var context = this.attr.context;
    eccentricity = eccentricity || 0;

    context.save();
    context.translate(x, y);
    // context.rotate(0.37);
    context.scale(1, 1 - eccentricity);

    context.beginPath();
    context.arc(0, 0, radius, 0, Math.PI * 2, true);
    context.closePath();
    context.fillStyle = 'transparent';
    context.strokeStyle = color;

    context.stroke();
    context.restore();
    // context.lineWidth = 1;
  };

  this.clear = function(x, y) {
    this.attr.context.clearRect(0, 0, this.attr.width, this.attr.height);
  };

  this.after('initialize', function() {
    this.attr.width = $(window).width();
    this.attr.height = $(window).height();
  });

}
