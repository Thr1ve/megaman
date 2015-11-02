/* global reduce */

// var getElements = function(map, unitSize) {
//   var elements = reduce(map, function(prev, cur) {
//     // cur = ['X', '_', etc...]
//     var line = parseMapLine(cur, unitSize);
//     return prev.concat(line);
//   }, []);
//   // return a collection of element objects
//   return elements;
// };

var createLevel = function(config) {
  // Create our main element
  var level = document.createElement('div');

  // Create the terrain
  // var elements = getElements(config.map, parseInt(config.unitSize, 10));
  // console.log('\n' + elements);

  // Create the background
  level.id = 'level';
  level.style.display = 'block';
  level.style.position = 'absolute';
  level.style.backgroundColor = config.backgroundColor;
  level.style.width = config.map[0].length * config.unitSize + 'px';
  level.style.height = config.map.length * config.unitSize + 'px';

  return level;
};

module.exports = createLevel;
