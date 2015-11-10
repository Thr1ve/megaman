/* global engine, clone, merge, mergeNew, compareKeys, processKeys, keyBool, render, IdStore, createLevel, testLevel, map, mapValues, reduce, each */
// World was:
  // width 2000
  // height 1500
// Wrapper was:
  // width 1100
  // height 900

var idStore = new IdStore;

var reducers = {};

reducers.actions = function(elementArray) {
  return map(elementArray, function(element) {
    var processed;
    var cloned = clone(element,
      [
        'id', 'resolveCollisions',
        'grounded', 'listening',
        'maxVelocity', 'x', 'y',
        'width', 'height',
        'xAcceleration', 'yAcceleration',
        'xVelocity', 'yVelocity',
        'backgroundImage', 'backgroundPosition',
        'affectedByPhysics',
      ]);
    // If this element is listening to player input
    if (element.listening) {
      // update its attributes with processKeys
      processed = processKeys(cloned, keyBool);
      // check if any attributes have changed and update the changed attribute accordingly
      processed.changed = !compareKeys(processed, element);
      // and any attributes changed, update the element and return it
      if (processed.changed) {
        return mergeNew(element, processed);
      }
    }
    return element;
  });
};

reducers.physics = function(elementArray) {
  return map(elementArray, function(element) {
    var processed;
    var cloned = clone(element,
      [
        'id', 'resolveCollisions',
        'grounded', 'listening',
        'maxVelocity', 'x', 'y',
        'width', 'height',
        'xAcceleration', 'yAcceleration',
        'xVelocity', 'yVelocity',
        'backgroundImage', 'backgroundPosition',
        'affectedByPhysics',
      ]);
    // I don't like 'affectedByPhysics' at all...
    // TODO: remove affectedByPhysics
    if (element.affectedByPhysics) {
      processed = engine.processPhysics(cloned);
      processed.changed = !compareKeys(processed, element);
      if (processed.changed) {
        return mergeNew(element, processed);
      }
    }
    return element;
  });
};

reducers.resolve = function(elementArray) {
  return map(elementArray, function(element) {
    var collidees, processed, cloned;
    // If this element is set to resolve its collisions
    if (element.resolveCollisions) {
      cloned = clone(element,
        [
          'id', 'resolveCollisions',
          'grounded', 'listening',
          'maxVelocity', 'x', 'y',
          'width', 'height',
          'xAcceleration', 'yAcceleration',
          'xVelocity', 'yVelocity',
          'backgroundImage', 'backgroundPosition',
          'affectedByPhysics',
        ]);
      // get an array of any elements colliding with this one
      collidees = engine.getCollidingElements(element, elementArray);
      // If there are any colliding elements
      if (collidees.length > 0) {
        // resolve the collisions and return the element
        processed = reduce(collidees, function(prev, collidee) {
          return engine.resolveCollision(prev, collidee);
        }, cloned);
        processed.changed = true;
        return mergeNew(element, processed);
      }
      return element;
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

  each(state, function(element) {
    if (element.changed) {
      render(element.domElement, element);
    }
  });
  setTimeout(mainLoop, 1000 / 45, state);
};
