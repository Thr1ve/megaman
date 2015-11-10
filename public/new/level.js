/* global each, map, reduce, mapUtils, idStore, Unit, Element, ANIMATIONS */

// TODO: try to make a single point in the process which decides whether to use number or string version of pixels ( i.e. '50px' or 50) so we can use parseInt as sparingly as possible


var createLevel = function(config) {
  // Create our main element
  var level = document.createElement('div');

  // Create the terrain
  var coordinates = mapUtils.processMap(config.map, parseInt(config.unitSize, 10));

    // We could add an element manually like this:
    // coordinates.push({
    //   x: 200,
    //   y: 300,
    //   width: 100,
    //   height: 100,
    // });

  var elementCollection = map(coordinates, function(coords) {
    var newElement = new Element(coords, 'blue');
    return newElement;
  });

  // Let's test creating a new unit
  var background = setFrame(ANIMATIONS.mRunAnimRight[0]);
  var player = new Element({
    x: 200,
    y: 300,
  }, background, true);
  player.resolveCollisions = true;
  elementCollection.push(player);


  // Add the terrain to the level
  each(elementCollection, function(elementObj) {
    level.appendChild(elementObj.domElement);
  });

  // Create the background
  level.id = 'level';
  level.style.position = 'relative';
  level.style.backgroundColor = config.backgroundColor;
  level.style.width = config.map[0].length * parseInt(config.unitSize, 10) + 'px';
  level.style.height = config.map.length * parseInt(config.unitSize, 10) + 'px';

  document.body.appendChild(level);

  // Return our collection of elements for use as the initial state
  return elementCollection;
};

module.exports = createLevel;
