/* global keyBind, render, IdStore, createLevel, testLevel, map, mapValues, reduce, each */
// World was:
  // width 2000
  // height 1500
// Wrapper was:
  // width 1100
  // height 900

var idStore = new IdStore;

var reducers = {};
reducers.physics = function(elementArray) {
  // Here we could filter to grab only elements that this reducer cares about ?
    // But then we would need to merge our changed elements with the existing elements array?

  // map our elements array
  return map(elementArray, function(element) {
    // element.x += 1;
    if (element.listening) {
      if (keyBool.w) {
        element.y -= 2;
      }
      if (keyBool.s) {
        element.y += 2;
      }
      if (keyBool.d) {
        element.x += 2;
      }
      if (keyBool.a) {
        element.x -= 2;
      }
    }
    return element;
  });
};

var initialize = function() {
  var state = createLevel(testLevel);
  // create initial state
  // start our main loop
  console.log(state);
  mainLoop(state);
};

var mainLoop = function(previousState) {
  var state = reduce(Object.keys(reducers), function(result, reducer) {
    var newState = reducers[reducer](result);
    return newState;
  }, previousState);

  // We may want to filter out elements that have not changed here before calling render on each element
  // state = state.filter(function(element) { return element.changed}) // MAKE OUR OWN FILTER FUNCTION
  each(state, function(element) {
    render(element.domElement, element);
  });
  setTimeout(mainLoop, 1000 / 45, state);
};
