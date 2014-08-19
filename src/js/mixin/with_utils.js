module.exports = withUtils;

function withUtils() {

  this.uuid = function() {

  };

  this.round = function(num, places) {
    return Math.round(num * Math.pow(10, places)) / Math.pow(10, places);
  };

};
