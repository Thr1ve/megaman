/* global reduce, objects, animations, setFrame */

var actions = {
  resting: function(element, keys) {
    var keyPresses = Object.keys(keys).filter(function(val) {
      return keys[val];
    });
    if (keyPresses.length === 0 && element.grounded) {
      if (element.facing) {
        return objects.mergeNew(element, animations.megaRunRight.getFrame(1));
      }
      return objects.mergeNew(element, animations.megaRunLeft.getFrame(1));
    }
    return element;
  },

  moveLeft: function(element, keys) {
    var changes = {};
    var animation = animations.megaRunLeft;
    if (keys.a) {
      changes.xAcceleration = element.xAcceleration - 1;
      changes.facing = false;
      objects.merge(changes, animation.getNextFrame(element.frame));
    } else if (element.xAcceleration <= 0) {
      changes.xAcceleration = 0;
    }
    return objects.mergeNew(element, changes);
  },

  moveRight: function(element, keys) {
    var changes = {};
    var animation = animations.megaRunRight;
    if (keys.d) {
      changes.xAcceleration = element.xAcceleration + 1;
      changes.facing = true;
      objects.merge(changes, animation.getNextFrame(element.frame));
    } else if (element.xAcceleration >= 0) {
      changes.xAcceleration = 0;
    }
    return objects.mergeNew(element, changes);
  },

  jump: function(element, keys) {
    var changes = {};
    var animation = element.facing ? animations.megaJumpRight : animations.megaJumpLeft;
    if (keys.space && element.grounded) {
      changes.yAcceleration = -9.7;
      changes.grounded = false;
      objects.merge(changes, animation.getFrame(1));
    } else if (keys.space) {
      changes.yAcceleration = element.yAcceleration * 0.85;
      if (element.frame < animation.length - 1) {
        objects.merge(changes, animation.getNextFrame(element.frame));
      } else {
        objects.merge(changes, animation.getFrame(7));
      }
    } else if (element.yAcceleration < 0) {
      changes.yAcceleration = element.yAcceleration * 0.6;
      if (element.frame < animation.length - 1) {
        objects.merge(changes, animation.getNextFrame(element.frame));
      } else {
        objects.merge(changes, animation.getFrame(7));
      }
    }
    return objects.mergeNew(element, changes);
  },

  shoot: function(element, keys) {
    var bullet;
    if (keys.w) {
      bullet = new Element({x: element.x + 50, y: element.y + 20, width: 50, height: 50}, 'blue');
      element.callback = function(elementArray) {
        element.level.appendChild(bullet.domElement);
        elementArray.push(bullet);
      };
      // console.log(elementArray);
    }
    return element;
  },
};

var processKeys = function(element, keys) {
  return reduce(Object.keys(actions), function(prev, cur) {
    return actions[cur](prev, keys);
  }, element);
};
