/* global reduce mergeNew */

var actions = {
  moveLeft: function(element, keys) {
    var changes = {};
    if (keys.d) {
      changes.xAcceleration = element.xAcceleration + 1;
      changes.changed = true;
    } else if (element.xAcceleration >= 0) {
      changes.xAcceleration = 0;
      changes.changed = true;
    }
    return mergeNew(element, changes);
  },

  moveRight: function(element, keys) {
    var changes = {};
    if (keys.a) {
      changes.xAcceleration = element.xAcceleration - 1;
      changes.changed = true;
    } else if (element.xAcceleration <= 0) {
      changes.xAcceleration = 0;
      changes.changed = true;
    }
    return mergeNew(element, changes);
  },
};

var processKeys = function(element, keys) {
  return reduce(Object.keys(actions), function(prev, cur) {
    return actions[cur](prev, keys);
  }, element);
};
