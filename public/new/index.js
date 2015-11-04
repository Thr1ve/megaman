/* global IdStore, createLevel, testLevel, mapValues, reduce */
// World was:
  // width 2000
  // height 1500
// Wrapper was:
  // width 1100
  // height 900

var idStore = new IdStore;
var reducers = {};
reducers.physics = function(element) {
  element.x = element.x + 1;
};

var initialize = function() {
  var state = createLevel(testLevel);
  // create initial state
  // start our main loop
  console.log(state);
  mainLoop(state);
};

var mainLoop = function(previousState) {
  // var state = reduce(Object.keys(reducers), function(result, reducer) {
  //   var newState = mapValues(result, reducers[reducer]);
  //   return newState;
  // }, previousState);
  var state = previousState;
  previousState.forEach(function(element) {
    element.render();
  });
  setTimeout(mainLoop, 1000 / 45, state);
};
