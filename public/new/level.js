/* global each, map, reduce, mapUtils, idStore */

// TODO: try to make a single point in the process which decides whether to use number or string version of pixels ( i.e. '50px' or 50) so we can use parseInt as sparingly as possible


var createLevel = function(config) {
  // Create our main element
  var level = document.createElement('div');

  // Create the terrain
  var coordinates = mapUtils.processMap(config.map, parseInt(config.unitSize, 10));
  var elementCollection = map(coordinates, function(coords) {
    var newElement = new Element(coords, 'blue');
    return newElement;
  });

  // Add the terrain to the level
  each(elementCollection, function(elementObj) {
    level.appendChild(elementObj.element);
  });

  // Create the background
  level.id = 'level';
  level.style.position = 'relative';
  level.style.backgroundColor = config.backgroundColor;
  level.style.width = config.map[0].length * parseInt(config.unitSize, 10) + 'px';
  level.style.height = config.map.length * parseInt(config.unitSize, 10) + 'px';

  document.body.appendChild(level);

  return elementCollection;
};

module.exports = createLevel;
