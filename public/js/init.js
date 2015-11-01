/* global physicsEngine, dynamicArray, staticArray, checkStates, aIAct, Wrapper, level1Declare, level1Initiate */

var main = function(wrapper) {
  physicsEngine(dynamicArray, staticArray, wrapper);
  checkStates();
  // highlightVisibility();
  // displayVisibility();
  aIAct();
  wrapper.scroll();
  setTimeout(main, 1000 / 45, wrapper);
};

// WHAT LEVEL YOU DECLARING?
var initialize = function() {
  // create our wrapper
  var world = new World(2000, 1500, 'black');
  var wrapper = new Wrapper(1100, 900, world.element);
  // create our world
  level1Declare();
  player = new Player(60, 60, 'player', wrapper);
  dynamicArray.push(player);

  // INITIATE SAME LEVEL AS YOU DECLARED
  level1Initiate(wrapper);
  main(wrapper);
};

initialize = initialize;
main = main;
