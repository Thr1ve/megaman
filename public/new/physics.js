/* global mergeNew, reduce */

var engine = {
  gravity: -4,
  friction: 0.8,
  // takes acceleration and updates velocity
  updateVelocity: function(element) {
    var changes = {};

    // If our x velocity is below 0.5, just make it 0
    if (Math.abs(element.xVelocity) < 0.5) {
      changes.xVelocity = 0;
    }

    // Calculate X velocity
    changes.xVelocity = (element.xVelocity + element.xAcceleration) * this.friction;

    // Velocity cannot go past our max
    if (element.xVelocity > element.maxVelocity) {
      changes.xVelocity = element.maxVelocity;
    } else if (element.xVelocity < -element.maxVelocity) {
      changes.xVelocity = -element.maxVelocity;
    }

    // Calculate Y velocity
    changes.yVelocity = (element.yVelocity + element.yAcceleration) - this.gravity;
    // Velocity cannot go past our max
    if (element.yVelocity > element.maxVelocity) {
      changes.yVelocity = element.maxVelocity;
    }
    if (element.yVelocity < -17) {
      changes.yVelocity = - 17;
    }
    return changes;
  },

  // takes velocity and updates x and y
  updateCoords: function(element) {
    var changes = {};
    changes.x = element.x + element.xVelocity;
    changes.y = element.y + element.yVelocity;
    return changes;
  },

  processPhysics: function(element) {
    // TODO: organize the engine object better so we can make the below a reduce function
    var processed = mergeNew(element, engine.updateVelocity(element));
    return mergeNew(processed, engine.updateCoords(processed));
  },

  // return true/false
  detectCollision: function(elementOne, elementTwo) {
    // Store the collider edges
    var halfWidthOne = elementOne.width / 2;
    var halfHeightOne = elementOne.height / 2;
    var xMidOne = elementOne.x + halfWidthOne;
    var yMidOne = elementOne.y + halfHeightOne;

    // store the collidee edges
    var halfWidthTwo = elementTwo.width / 2;
    var halfHeightTwo = elementTwo.height / 2;
    var xMidTwo = elementTwo.x + halfWidthTwo;
    var yMidTwo = elementTwo.y + halfHeightTwo;

    var safeDistanceX = halfWidthOne + halfWidthTwo;
    var safeDistanceY = halfHeightOne + halfHeightTwo;

    if (Math.abs(xMidOne - xMidTwo) >= safeDistanceX || Math.abs(yMidOne - yMidTwo) >= safeDistanceY) {
      return false;
    }
    return true;
  },

  // returns any elements in a collection which are colliding with the given element
  getCollidingElements: function(element, collection) {
    return collection.filter(function(collidee) {
      if (element.id === collidee.id) {
        return false;
      }
      return engine.detectCollision(element, collidee);
    });
  },

  resolveCollision: function(element, collidee) {
    // Get our midpoints for element
    var halfElementWidth = element.width / 2;
    var halfElementHeight = element.height / 2;
    var elementMidX = element.x + halfElementWidth;
    var elementMidY = element.y + halfElementHeight;

    // Get our midpoints for collidee
    var halfCollideeWidth = collidee.width / 2;
    var halfCollideeHeight = collidee.height / 2;
    var collideeMidX = collidee.x + halfCollideeWidth;
    var collideeMidY = collidee.y + halfCollideeHeight;

    // TODO: figure out how I figured this out? How on earth did I know to do this?
    var nMidX = (elementMidX - collideeMidX) / halfCollideeWidth;
    var nMidY = (elementMidY - collideeMidY) / halfCollideeHeight;
    var absMX = Math.abs(nMidX);
    var absMY = Math.abs(nMidY);

    // // If it is a Vertical collision...
    if (absMY > absMX) {
      // If we are colliding from below
      // ___
      //  ^
      if (nMidY > 0) {
        element.y = collidee.y + collidee.height;
        element.yAcceleration = 0;
        element.yVelocity = 0;
        // TODO: Figure out what I used element.collisionDirection for and remove if unecessary
        element.collisionDirection = '-y';
      }
      // If we are colliding from above
      //  V
      // ---
      if (nMidY < 0) {
        element.y = collidee.y - element.height;
        element.yAcceleration = 0;
        element.yVelocity = 0;
        element.grounded = true;
      }
    }

    // If it is a Horizontal collision...
    if (absMX > absMY) {
      // If we are colliding from the right
      // | <-
      if (nMidX > 0) {
        element.x = collidee.x + collidee.width;
        element.xAcceleration = 0;
        element.xVelocity = 0;
        // TODO: Figure out what I used element.collisionDirection for and remove if unecessary
        element.collisionDirection = 'x';
      }
      // // If we are colliding from the left
      // // -> |
      if (nMidX < 0) {
        element.x = collidee.x - element.width;
        element.xAcceleration = 0;
        element.xVelocity = 0;
        // TODO: Figure out what I used element.collisionDirection for and remove if unecessary
        element.collisionDirection = '-x';
      }
    }
    // TODO: Can I add a callback to certain element objects that would be passed into this function?
    // I could then call that function here. This would allow me to perform specific, unique behaviors on collision for elements
    // for instance: a bullet that has collided needs to get removed and/or remove health from its collidee
    // I actually might want to perform the callback the instant a collision is evaluated as true instead of here...
    return element;
  },
};

/*

acceleration = acceleration;
var physicsEngine = function(dynamicArray, staticArray, wrapper) {
  function checkMElementArray() {
    var i = 0;
    for (i; i < mElementArray.length; i++) {
      if (mElementArray[i].getBottom() === mElementArray[i].topRange) {
        mElementArray[i].vy = -mElementArray[i].vy;
      }
      if (mElementArray[i].getBottom() === mElementArray[i].bottomRange) {
        mElementArray[i].vy = Math.abs(mElementArray[i].vy);
      }
      mElementArray[i].element.style.bottom = mElementArray[i].getBottom() + mElementArray[i].vy + 'px';
    }
  }

  function checkCollision(i) {
    var j = 0;
    for (j; j < staticArray.length; j++) {
      if (dynamicArray[i].collide(staticArray[j])) {
        if (staticArray[j].type === 'pickup') {
          staticArray[j].collisionAction();
          staticArray.splice(j, 1);
        } else {
          dynamicArray[i].resolveCollision(staticArray[j]);
        }
      }
    }
  }

  function checkDynamicArray() {
    var i = 0;
    for (i; i < dynamicArray.length; i++) {
      // calculate acceleration and velocity
      acceleration(dynamicArray[i]);
      dynamicArray[i].element.style.left = dynamicArray[i].getLeft() + dynamicArray[i].vx + 'px';
      dynamicArray[i].element.style.bottom = dynamicArray[i].getBottom() + dynamicArray[i].vy + 'px';
      checkCollision(i);
      // if out of bounds, bounce back in
      if (dynamicArray[i].getRight() > parseInt(wrapper.world.style.width, 10) ||
        dynamicArray[i].getLeft() < 0 ||
        dynamicArray[i].getTop() > parseInt(wrapper.world.style.height, 10) ||
        dynamicArray[i].getBottom() < 0) {
        if (dynamicArray[i].getRight() > parseInt(wrapper.world.style.width, 10)) {
          dynamicArray[i].element.style.left = parseInt(wrapper.world.style.width, 10) - 100 + 'px';
        } else if (dynamicArray[i].getLeft() < 0) {
          dynamicArray[i].element.style.left = '70px';
        }
        if (dynamicArray[i].getTop() > parseInt(wrapper.world.style.height, 10)) {
          dynamicArray[i].element.style.bottom = parseInt(wrapper.world.style.height, 10) - 100 + 'px';
        } else if (dynamicArray[i].getBottom() < 0) {
          dynamicArray[i].element.style.bottom = '70px';
        }
      }
    }
  }

  function checkProjectileArray() {
    var i = 0;
    var j = 0;
    var k = 0;
    var l = 0;
    var u = 0;
    for (i; i < projectileArray.length; i++) {
      projectileArray[i].element.style.left = projectileArray[i].getLeft() + projectileArray[i].vx + 'px';
      projectileArray[i].element.style.bottom = projectileArray[i].getBottom() + projectileArray[i].vy + 'px';
    }
    for (k; k < projectileArray.length; k++) {
      for (j; j < staticArray.length; j++) {
        if (projectileArray[k].collide(staticArray[j])) {
          projectileArray[k].remove();
          projectileArray.splice(k, 1);
          break;
        }
      }
    }
    for (l; l < projectileArray.length; l++) {
      for (u; u < dynamicArray.length; u++) {
        if (projectileArray[l].collide(dynamicArray[u])) {
          dynamicArray[u].health -= projectileArray[l].damage;
          projectileArray[l].remove();
          projectileArray.splice(l, 1);
          break;
        }
      }
    }
  }
  checkMElementArray();
  checkDynamicArray();
  checkProjectileArray();
};

physicsEngine = physicsEngine;
*/
