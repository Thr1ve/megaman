/* global physicsEngine, dynamicArray, staticArray, checkStates, aIAct, wrapper, level1Declare, level1Initiate */

var main = function() {
  physicsEngine(dynamicArray, staticArray);
  checkStates();
  // highlightVisibility();
  // displayVisibility();
  aIAct();
  wrapper.scroll();
  setTimeout(main, 1000 / 45);
};

// WHAT LEVEL YOU DECLARING?
var initialize = function() {
  level1Declare();
  // INITIATE SAME LEVEL AS YOU DECLARED
  level1Initiate();
  main();
};

initialize = initialize;
main = main;
