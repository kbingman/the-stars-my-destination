module.exports = withCanvas;

function withCanvas() {

  this.disk = function(x, y, radius, color) {
    var context = this.attr.context;

    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, true);
    context.closePath();
    context.fillStyle = color;
    context.fill();
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

  this.drawPlanet = function(centerX, centerY, radius, eccentricity, period){
      var context = this.attr.context;

      for (var i = 0 * Math.PI; i < 2 * Math.PI; i += 0.3 ) {
          xPos = centerX - (radius * (1 - eccentricity)  * Math.sin(i)) * Math.sin(0 * Math.PI) + (radius * Math.cos(i)) * Math.cos(0 * Math.PI);
          yPos = centerY + (radius * Math.cos(i)) * Math.sin(0 * Math.PI) + (radius * (1 - eccentricity) * Math.sin(i)) * Math.cos(0 * Math.PI);

          context.save();

          context.translate(xPos, yPos);
          context.rotate(0.67);
          this.disk(0, 0, 2, 'white');
          context.restore();

      }

  };

  this.clear = function(x, y) {
    this.attr.context.clearRect(0, 0, this.attr.width, this.attr.height);
  };

  this.after('initialize', function() {
    this.attr.width = $(window).width();
    this.attr.height = $(window).height();
  });

}
