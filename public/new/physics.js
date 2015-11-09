var engine = {
  // takes acceleration and updates velocity
  acceleration: function(element) {
    // TODO: move maxSpeed to element
    var max = 10;
    // TODO: Should gravity and friction be constants held elsewhere ?
    var gravity = -4;
    var friction = 0.8;

    // If our x Velocity is below 0.5, just make it 0
    if (Math.abs(element.xVelocity) < 0.5) {
      element.xVelocity = 0;
    }

    // Calculate X velocity
    element.xVelocity = (element.xVelocity + element.xAcceleration) * friction;

    // Velocity cannot go past our max
    if (element.xVelocity > max) {
      element.xVelocity = max;
    } else if (element.xVelocity < -max) {
      element.xVelocity = -max;
    }

    // Calculate Y velocity
    // element.yVelocity = (element.yVelocity + element.yAcceleration) - gravity;
    // if (element.yVelocity > max) {
    //   element.yVelocity = max;
    // }
    // if (element.yVelocity < -17) {
    //   element.yVelocity = - 17;
    // }
    return element;
  },
  // takes velocity and updates x and y
  // velocity: function(element) {
  //
  // },
};

/* global wrapper.world, mElementArray, dynamicArray, projectileArray */
// Physics
/*

maxSpeec was 10 for player

var acceleration = function(unit) {
  var max = unit.maxSpeed;
  var gravity = 4;
  var friction = 0.8;
  // var absVY = Math.abs(unit.vy);
  var absVX = Math.abs(unit.vx);

  unit.performAction();
  // calculate x velocity
  if (absVX < 0.5) {
    unit.vx = 0;
  }

  unit.vx = (unit.vx + unit.ax) * friction;

  if (unit.vx > max) {
    unit.vx = max;
  }
  if (unit.vx < -max) {
    unit.vx = -max;
  }
  // calculate y velocity
  unit.vy = (unit.vy + unit.ay) - gravity;
  // if(unit.vy>max) {
  //   unit.vy = max;
  // }
  if (unit.vy < -17) {
    unit.vy = - 17;
  }
};

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
