/* global myWorld, acceleration, mElementArray, dynamicArray, projectileArray */
// Physics
physicsEngine = function(dynamicArray, staticArray) {
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
      if (dynamicArray[i].getRight() > parseInt(myWorld.element.style.width, 10) ||
        dynamicArray[i].getLeft() < 0 ||
        dynamicArray[i].getTop() > parseInt(myWorld.element.style.height, 10) ||
        dynamicArray[i].getBottom() < 0) {
        if (dynamicArray[i].getRight() > parseInt(myWorld.element.style.width, 10)) {
          dynamicArray[i].element.style.left = parseInt(myWorld.element.style.width, 10) - 100 + 'px';
        } else if (dynamicArray[i].getLeft() < 0) {
          dynamicArray[i].element.style.left = '70px';
        }
        if (dynamicArray[i].getTop() > parseInt(myWorld.element.style.height, 10)) {
          dynamicArray[i].element.style.bottom = parseInt(myWorld.element.style.height, 10) - 100 + 'px';
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
