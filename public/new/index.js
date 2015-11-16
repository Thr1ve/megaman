/* global ANIMATIONS, Animation, objects, reducers, render, IdStore, createLevel, testLevel, map, reduce, each */
// World was:
  // width 2000
  // height 1500
// Wrapper was:
  // width 1100
  // height 900

var animations = (function(obj) {
  var keys = Object.keys(obj);
  var newObj = {};
  var i = 0;
  for (i; i < keys.length; i++) {
    newObj[keys[i]] = new Animation(obj[keys[i]]);
  }
  return newObj;
})(ANIMATIONS);

console.log(animations);

var mainLoop = function(previousState, levelDom) {
  var state = reduce(Object.keys(reducers), function(result, reducer) {
    var newState = reducers[reducer](result);
    return newState;
  }, previousState);

  state = map(state, function(element) {
    if (element.mainLoopCallback) {
      element.mainLoopCallback(levelDom, state);
      return objects.without(element, 'mainLoopCallback');
    }
    return element;
  });

  each(state, function(element) {
    // only render if element has changed
    if (element.changed) {
      render(element.domElement, element);
    }
  });

  setTimeout(mainLoop, 1000 / 45, state, levelDom);
};

var initialize = function() {
  var state = createLevel(testLevel);
  var stateCollection = state.elementCollection;
  var levelDom = state.levelDom;
  // create initial state
  // start our main loop
  // console.log(state);
  mainLoop(stateCollection, levelDom);
};
