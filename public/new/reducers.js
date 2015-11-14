/* global processKeys, map, reduce, objects, keyBool, engine */

var reducers = {};

reducers.actions = function(elementArray) {
  var mappedElementArray = map(elementArray, function(element) {
    var processed;
    var cloned = objects.without(element, 'domElement');
    // If this element is listening to player input
    if (element.listening) {
      // update its attributes with processKeys
      processed = processKeys(cloned, keyBool, elementArray);
      // check if any attributes have changed and update the changed attribute accordingly
      processed.changed = !objects.compareKeys(processed, element);
      if (processed.changed) {
        return objects.mergeNew(element, processed);
      }
    }
    return element;
  });

  return mappedElementArray;
};

reducers.physics = function(elementArray) {
  return map(elementArray, function(element) {
    var processed;
    var cloned = objects.without(element, 'domElement');
    // I don't like 'affectedByPhysics' at all...
    // TODO: remove affectedByPhysics
    if (element.affectedByPhysics) {
      processed = engine.processPhysics(cloned);
      processed.changed = !objects.compareKeys(processed, element);
      if (processed.changed) {
        return objects.mergeNew(element, processed);
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
      cloned = objects.without(element, 'domElement');
      // get an array of any elements colliding with this one
      collidees = engine.getCollidingElements(element, elementArray);
      // If there are any colliding elements
      if (collidees.length > 0) {
        // resolve the collisions and return the element
        processed = reduce(collidees, function(prev, collidee) {
          return engine.resolveCollision(prev, collidee);
        }, cloned);
        processed.changed = true;
        return objects.mergeNew(element, processed);
      }
      return element;
    }
    return element;
  });
};
