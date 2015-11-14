
var reducers = {};

reducers.actions = function(elementArray, levelDom) {
  var mappedElementArray = map(elementArray, function(element) {
    var processed;
    var cloned = clone(element,
      [
        'id', 'resolveCollisions',
        'grounded', 'listening',
        'maxVelocity', 'x', 'y',
        'width', 'height', 'grounded',
        'xAcceleration', 'yAcceleration',
        'xVelocity', 'yVelocity',
        'backgroundImage', 'backgroundPosition',
        'affectedByPhysics', 'frame', 'facing',
      ]);
    // If this element is listening to player input
    if (element.listening) {
      // update its attributes with processKeys
      processed = processKeys(cloned, keyBool, elementArray);
      // check if any attributes have changed and update the changed attribute accordingly
      processed.changed = !compareKeys(processed, element);
      if (processed.changed) {
        return mergeNew(element, processed);
      }
    }
    return element;
  });

  return mappedElementArray;
};

reducers.physics = function(elementArray, levelDom) {
  return map(elementArray, function(element) {
    var processed;
    var cloned = clone(element,
      [
        'id', 'resolveCollisions',
        'grounded', 'listening',
        'maxVelocity', 'x', 'y',
        'width', 'height', 'grounded',
        'xAcceleration', 'yAcceleration',
        'xVelocity', 'yVelocity',
        'backgroundImage', 'backgroundPosition',
        'affectedByPhysics', 'frame', 'facing',
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

reducers.resolve = function(elementArray, levelDom) {
  return map(elementArray, function(element) {
    var collidees, processed, cloned;
    // If this element is set to resolve its collisions
    if (element.resolveCollisions) {
      cloned = clone(element,
        [
          'id', 'resolveCollisions',
          'grounded', 'listening',
          'maxVelocity', 'x', 'y',
          'width', 'height', 'grounded',
          'xAcceleration', 'yAcceleration',
          'xVelocity', 'yVelocity',
          'backgroundImage', 'backgroundPosition',
          'affectedByPhysics', 'frame', 'facing',
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
