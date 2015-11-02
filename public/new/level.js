/* global reduce, mapUtils */

var createLevel = function(config) {
  // Create our main element
  var level = document.createElement('div');

  // Create the terrain
  var coordinates = mapUtils.processMap(config.map, parseInt(config.unitSize, 10));
  console.log(coordinates[0]);

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
