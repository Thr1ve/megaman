/*Unit class*/
function Unit(x,y,id){
  this.setUp(id);
  this.setXandY(x,y);
  this.type = "dynamic";
  this.frame = 0;
  this.collisionDirection = 0;
  this.grounded = true;
  this.health = 10;
  //velocity
  this.vx = 0;
  this.vy = 0;
  //acceleration
  this.ax = 0;
  this.ay = 0;
  this.sightDistance = 300;
}
  Unit.prototype = new LevelElem();
  Unit.prototype.lineOfSight = function(target) {
    var thisMidX = this.getMidX();
    var thisMidY = this.getMidY();
    var targetMidX = target.getMidX();
    var targetMidY = target.getMidY();
    var targetX = (thisMidX - targetMidX);
    var targetY = (thisMidY - targetMidY);
    var targetDistance = Math.sqrt((targetX*targetX) + (targetY*targetY));
    if(targetDistance >= this.sightDistance) {
      return false;
    }
    else {
      for(var i = 0; i<staticArray.length; i++) {
        var thisMidX = this.getMidX();
        var thisMidY = this.getMidY();
        var targetMidX = target.getMidX();
        var targetMidY = target.getMidY();
        var elemLeft = staticArray[i].getLeft();
        var elemRight = staticArray[i].getRight();
        var elemBottom = staticArray[i].getBottom();
        var elemTop = staticArray[i].getTop();
        //if static element is between unit and target, continue
        if(!( ((thisMidX > elemRight) && (targetMidX > elemRight)) ||
          ((thisMidX < elemLeft) && (targetMidX < elemLeft)) ||
          ((thisMidY > elemTop) && (targetMidY > elemTop)) ||
          ((thisMidY < elemBottom) && (targetMidY < elemBottom))) ) {
          //then find cartesian coordinates of outermost corners of element and target using this as 0; take theta for each
            //top left
          var aX = (thisMidX - elemLeft);
          var aY = (thisMidY - elemTop);
          var aTheta = Math.atan2(aY,aX);

            //top right
          var bX = (thisMidX - elemRight);
          var bY = (thisMidY - elemTop);
          var bTheta = Math.atan2(bY,bX);

            //bottom left
          var cX = (thisMidX - elemLeft);
          var cY = (thisMidY - elemBottom);
          var cTheta = Math.atan2(cY,cX);

            //bottom right
          var dX = (thisMidX - elemRight);
          var dY = (thisMidY - elemBottom);
          var dTheta = Math.atan2(dY,dX);

            //target theta
          var targetTheta = Math.atan2(targetY,targetX);

          //find outermost corners
          var corners = [aTheta, bTheta, cTheta, dTheta];
          corners.sort(function(a,b){return a - b});
          var cOuterSmallest = corners[0];
          var cOuterLargest = corners[3];
          if (((cOuterLargest >= 0) && (cOuterSmallest <=0)) && ((Math.abs(cOuterLargest) > (Math.PI * 0.5)) && Math.abs(cOuterSmallest) > (Math.PI * 0.5))) {
            cOuterSmallest = corners[1];
            cOuterLargest = corners[2];
            if(targetTheta > 0) {
              if (targetTheta > cOuterLargest) {
              return false;
              }
            }
            else if(targetTheta < 0) {
              if (targetTheta < cOuterSmallest) {
                return false;
              }
            }

          }
          //if target theta is between outer corner thetas, return false
          else if(targetTheta < cOuterLargest && targetTheta > cOuterSmallest) {
            return false;
          }
        }
      }
      return true;
    }
  }
  //display visibility by adding background to enemy
  highlightVisibility = function() {
    for (var i = 0; i<nPCArray.length;i++) {
      if(nPCArray[i].lineOfSight(player)) {
        nPCArray[i].element.style.outline = "4px solid red";
      }
      else {
        nPCArray[i].element.style.outline = "none";
      }
    }
  }
  //display visibility in charge bar
  displayVisibility = function(unit) {
    if(unit.lineOfSight(player)) {
      wrapper.coinCount.innerHTML = "visible";
    }
    else{
      wrapper.coinCount.innerHTML = "hidden";
    }
  }


  Unit.prototype.collide = function(collidee) {

    // Store the collider and collidee edges
    var l1 = this.getLeft();
    var b1 = this.getBottom();
  var hW1 = this.getHalfWidth();
  var hH1 = this.getHalfHeight();
  var midX1 = this.getMidX();
  var midY1 = this.getMidY();

    var l2 = collidee.getLeft();
    var b2 = collidee.getBottom();
  var hW2 = collidee.getHalfWidth();
  var hH2 = collidee.getHalfHeight();
  var midX2 = collidee.getMidX();
  var midY2 = collidee.getMidY();

  var safeDistanceX = hW1 + hW2;
  var safeDistanceY = hH1 + hH2;

    if (   Math.abs(midX1 - midX2)>= safeDistanceX ||
      Math.abs(midY1 - midY2)>= safeDistanceY)
    {
        return false;
    }
    else  {
    return true;
    }
  }
  Unit.prototype.resolveCollision = function(collidee) {
    var midX1 = this.getMidX();
    var midY1 = this.getMidY();
    var midX2 = collidee.getMidX();
    var midY2 = collidee.getMidY();
    var nMidX = ( midX1 - midX2) / collidee.getHalfWidth();
    var nMidY = ( midY1 - midY2) / collidee.getHalfHeight();
    var absMX = Math.abs(nMidX);
    var absMY = Math.abs(nMidY);
    if (absMY>absMX) {
      if(nMidY>0) {
        this.element.style.bottom = collidee.getTop() + "px";
        this.ay = 0;
        this.vy = 0;
        this.grounded = true;
      }
      if(nMidY<0){
        this.element.style.bottom = parseInt(collidee.element.style.bottom) - parseInt(this.element.style.height) + "px";
        this.ay = 0;
        this.vy = 0;
        this.collisionDirection = "-y";
      }
    }
    if (absMX>absMY) {
      if(nMidX>0) {
        this.element.style.left = collidee.getRight() + "px";
        this.ax = 0;
        this.vx = 0;
        this.collisionDirection = " x";
      }
      if(nMidX<0) {
        this.element.style.left = collidee.getLeft() - parseInt(this.element.style.width) + "px";
        this.ax = 0;
        this.vx = 0;
        this.collisionDirection = "-x";
      }
    }
  }

  Unit.prototype.performAction = function() {}
