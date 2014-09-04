module.exports = function(){
  // console.log(+new Date() - start + 'ms');
  console.log('systems', this.attr.systems.length);
  console.log('red', this.attr.systems.filter(function(s){
    return s.type === 'M';
  }).length);
  console.log('orange', this.attr.systems.filter(function(s){
    return s.type === 'K';
  }).length);
  console.log('yellow', this.attr.systems.filter(function(s){
    return s.type === 'G';
  }).length);
  console.log('yellow-white', this.attr.systems.filter(function(s){
    return s.type === 'F';
  }).length);
  console.log('white', this.attr.systems.filter(function(s){
    return s.type === 'A';
  }).length);
  console.log('blue-white', this.attr.systems.filter(function(s){
    return s.type === 'B';
  }).length);
  console.log('blue', this.attr.systems.filter(function(s){
    return s.type === 'O';
  }).length);
}
