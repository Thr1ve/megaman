// Physics
physicsEngine = function(dynamicArray, staticArray){
  for(var i = 0; i<mElementArray.length; i++) {
      if(mElementArray[i].getBottom() == mElementArray[i].topRange) {
        mElementArray[i].vy = -mElementArray[i].vy;
      }
      if(mElementArray[i].getBottom() == mElementArray[i].bottomRange) {
        mElementArray[i].vy = Math.abs(mElementArray[i].vy);
      }
      mElementArray[i].element.style.bottom = mElementArray[i].getBottom() + mElementArray[i].vy + "px";
    }
  for(var i = 0; i<dynamicArray.length; i++) {
    /*calculate acceleration and velocity*/
    acceleration(dynamicArray[i]);
    dynamicArray[i].element.style.left = dynamicArray[i].getLeft() + dynamicArray[i].vx + "px";
    dynamicArray[i].element.style.bottom = dynamicArray[i].getBottom() + dynamicArray[i].vy + "px";
    for(var j = 0; j<staticArray.length;j++) {
      if(dynamicArray[i].collide(staticArray[j])) {
        if(staticArray[j].type == "pickup") {
          staticArray[j].collisionAction();
          staticArray.splice(j,1);
        }
        else {
          dynamicArray[i].resolveCollision(staticArray[j]);
        }
      }
    }
    /*if out of bounds, bounce back in*/
    if (dynamicArray[i].getRight() > parseInt(myWorld.element.style.width) ||
      dynamicArray[i].getLeft() < 0 ||
      dynamicArray[i].getTop() > parseInt(myWorld.element.style.height) ||
      dynamicArray[i].getBottom() < 0) {
        if(dynamicArray[i].getRight() > parseInt(myWorld.element.style.width)) {
          dynamicArray[i].element.style.left = parseInt(myWorld.element.style.width) - 100 + "px";
        }
        else if(dynamicArray[i].getLeft() < 0) {
          dynamicArray[i].element.style.left = "70px";
        }
        if(dynamicArray[i].getTop() > parseInt(myWorld.element.style.height)) {
          dynamicArray[i].element.style.bottom = parseInt(myWorld.element.style.height) - 100 + "px";
        }
        else if (dynamicArray[i].getBottom() < 0) {
          dynamicArray[i].element.style.bottom = "70px";
        }
      }
  }
  for(var i = 0; i<projectileArray.length; i++) {
    projectileArray[i].element.style.left = projectileArray[i].getLeft() + projectileArray[i].vx + "px";
    projectileArray[i].element.style.bottom = projectileArray[i].getBottom() + projectileArray[i].vy + "px";
  }
  for(var i = 0; i<projectileArray.length;i++) {
    for(var j = 0; j<staticArray.length; j++) {
      if(projectileArray[i].collide(staticArray[j])) {

        projectileArray[i].remove();
        projectileArray.splice(i,1);
        break;
      }
    }
  }
  for(var i = 0; i<projectileArray.length;i++) {
    for(var u = 0; u<dynamicArray.length; u++) {
      if(projectileArray[i].collide(dynamicArray[u])) {

        dynamicArray[u].health -= projectileArray[i].damage;
        projectileArray[i].remove();
        projectileArray.splice(i,1);
        break;
      }
    }
  }
}
