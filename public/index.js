/*Physics*/
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

/*main accel and velocity function*/
acceleration = function(unit){
  var max = unit.maxSpeed;
  var gravity = 4;
  var friction = 0.8;
  var absVY = Math.abs(unit.vy);
  var absVX = Math.abs(unit.vx);

  unit.performAction();
  /*calculate x velocity*/
    if(absVX <0.5) {
    unit.vx = 0;
  }

  unit.vx = (unit.vx + unit.ax) * friction;

  if(unit.vx>max) {
    unit.vx = max;
  }
  if(unit.vx<-max) {
    unit.vx = -max;
  }
  /*calculate y velocity*/
  unit.vy = (unit.vy + unit.ay) - gravity;
  //if(unit.vy>max) {
  //  unit.vy = max;
  //}
  if(unit.vy<- 17) {
    unit.vy = - 17;
  }

}

/*check states*/

checkStates = function() {
  for(var i = 0; i<dynamicArray.length;i++) {
    if(  dynamicArray[i].health <= 0) {
      dynamicArray[i].element.remove();
      dynamicArray.splice(i,1);
      break;
    }
  }
  if( player.health <=0 ) {
    wrapper.coinCount.innerHTML = "YOU DEAD, SON.";
  }
}
function aI() {

}
aIAct = function() {
  for(var i = 0;i<nPCArray.length;i++) {
    nPCArray[i].performAction;
  }
}
lineOfFire = function() {
  for(var i = 0; i<dynamicArray.length; i++) {
    if(  dynamicArray[i].lineOfSight(player)) {
      var random = Math.random();
      if(random > 0.97) {
        dynamicArray[i].shoot();
      }
    }
  }
}

/*static Object Array*/
var staticArray = [];

/*mElement object array*/
var mElementArray = [];

/*dynamic Object Array*/
var dynamicArray = [];

/*projectile Array*/
var projectileArray = [];

/*npc array*/
var nPCArray = [];

/*Movement*/
/* get unicode */
function getUni(e){
  var unicode=e.keyCode? e.keyCode : e.charCode
  alert(unicode)
}
/* return unicode*/
function retUni(e){
var unicode=e.keyCode? e.keyCode : e.charCode
return(unicode)
}
  /*keybool array to store current bool values for keys*/
var keyBool = [
  false, // W     87
  false, // A     65
  false, // D     68
  false, // S      83
  false, // Space Bar 32
]
  /*switch to assign keybools true*/
function switchT(key){
  var keyUni = retUni(key);
  switch(keyUni){
    case 87: // W
      keyBool[0] = true;
      break;
    case 65: // A
      keyBool[1] = true;
      break;
    case 68: // D
      keyBool[2] = true;
      break;
    case 83: // S
      keyBool[3] = true;
      break;
    case 32: // Space Bar
      keyBool[4] = true;
      break;
  }
}
  /*swith to assign keybools false*/
function switchF(key){
  var keyUni = retUni(key);
  switch(keyUni){
    case 87: // W
      keyBool[0] = false;
      break;
    case 65: // A
      keyBool[1] = false;
      break;
    case 68: // D
      keyBool[2] = false;
      break;
    case 83: // S
      keyBool[3] = false;
      break;
    case 32: // Space Bar
      keyBool[4] = false;
      break;
  }
}


/*Start Classes
*
*
          *
          *
          */

/**
 *
 * Wrapper Class
 *
 */

function Wrapper(width, height, target) {
  this.element = document.createElement("div");
  this.element.id = "wrapper";
  this.element.style.overflow = "hidden";
  this.element.style.position = "relative";
  this.element.style.height = height + "px";
  this.element.style.width = width + "px";
  this.element.zIndex = "9";
  this.left = 0;
  this.innerLeft = this.left+200;
  this.innerRight = this.left + 800;
  this.bottom = 0;
  this.innerBottom = this.bottom + 200;
  this.innerTop = this.bottom + 400;
  this.coinCount = document.createElement("div");
  this.element.appendChild(this.coinCount);
  this.coinCount.style.position = "fixed";
  this.coinCount.style.color = "midnightblue";

  this.coinCount.style.fontFamily = "Impact";
  this.coinCount.style.fontSize = "xx-large";
  this.coinCount.style.fontWeight = "900";
  this.coinCount.style.zIndex = "10";
  this.coinCount.style.fontStyle = "bold";
  this.coinCount.style.left = "5px";
  this.energy = document.createElement("div");
  this.element.appendChild(this.energy);
  this.energy.style.position = "fixed";
  this.energy.style.backgroundColor="goldenrod";
  this.energy.style.opacity = 0.7;
  this.energy.style.zIndex = "9";
  this.energy.style.height = "40px";
  this.energy.style.borderRadius = "5px";
  this.energy.style.left = "0px";

  this.appendBody = function(){
    document.body.appendChild(this.element);
  }

}
Wrapper.prototype.startLeft = function() {

  var playerL = parseInt(player.element.style.left);
  var playerLM = playerL + (parseInt(player.element.style.width) * 0.5);
  var wrapperW = parseInt(this.element.style.width);
  var worldL = - playerLM + (wrapperW * 0.5);
  if(worldL < 0 && worldL > -900) {
    this.left = playerLM - (wrapperW * 0.5);
    this.innerLeft = this.left +200;
    this.innerRight = this.left + 800;
    myWorld.element.style.left = - playerLM + (wrapperW * 0.5) + "px";
  }
  else if (worldL >= 0) {
    myWorld.element.style.left = 0 + "px";
    this.left = 0;
    this.innerLeft = this.left +200;
    this.innerRight = this.left + 800;
  }
  else if (worldL <= -900) {
    myWorld.element.style.left = -900 + "px";
    this.left = 900;
    this.innerLeft = this.left +200;
    this.innerRight = this.left + 800;
  }

}
Wrapper.prototype.startBottom = function() {
  var playerB = parseInt(player.element.style.bottom);
  var playerBM = playerB + (parseInt(player.element.style.height) * 0.5);
  var wrapperH = parseInt(this.element.style.height);
  var worldB = -playerBM + (wrapperH);
  if (worldB < 600 && worldB > 0) {

    this.bottom = playerBM - (wrapperH * 0.5);
    this.innerBottom = this.bottom +200;
    this.innerTop = this.bottom + 500;
    myWorld.element.style.bottom = (parseInt(myWorld.element.style.height) - (wrapperH*0.5)) - (playerBM)  + "px";
  }
  else if(worldB >= 600) {

    this.bottom = 600;
    this.innerBottom = this.bottom +200;
    this.innerTop = this.bottom + 500;
    myWorld.element.style.bottom = 600  + "px";
  }
  else if(worldB <= 0) {

    this.bottom = 0;
    this.innerBottom = this.bottom +200;
    this.innerTop = this.bottom + 500;
    myWorld.element.style.bottom = 0  + "px";
  }
}
Wrapper.prototype.scroll = function() {
  var playerL = parseInt(player.element.style.left);
  var playerB = parseInt(player.element.style.bottom);
  var worldB = parseInt(myWorld.element.style.bottom);
  var worldH = parseInt(myWorld.element.style.height);
  var worldL = parseInt(myWorld.element.style.left);
  var worldW = parseInt(myWorld.element.style.width);
  var wrapperH = parseInt(this.element.style.height);
  var wrapperW = parseInt(this.element.style.width);
    if (playerL > this.innerRight) {
      if(playerL>= worldW - (wrapperW-(this.innerRight-this.left))) {
        this.left = worldW - wrapperW;
      }
      else {
        this.left = playerL - 800;
      }
      this.innerLeft = this.left +200;
      this.innerRight = this.left + 800;
      myWorld.element.style.left = -this.left + "px";
    }
    else if (playerL < this.innerLeft) {
      if(playerL<= worldL + this.innerLeft) {
        this.left = 0
      }
      else {
        this.left = playerL - 200;
      }
      this.innerLeft = this.left +200;
      this.innerRight = this.left + 800;
      myWorld.element.style.left = -this.left + "px";
    }
    if(playerB > this.innerTop ) {
      if(playerB>= worldH - (wrapperH-(this.innerTop-this.bottom))) {
        this.bottom = 600;
      }
      else {
        this.bottom = playerB - 500;
      }
      this.innerBottom = this.bottom + 200;
      this.innerTop = this.bottom + 500;
      myWorld.element.style.bottom = worldH - wrapperH - this.bottom + "px";
    }
    else if(playerB < this.innerBottom) {
      if(playerB <= 200) {
        this.bottom = 0;
      }
      else {
        this.bottom = playerB - 200;
      }
      this.innerBottom = this.bottom + 200;
      this.innerTop = this.bottom + 500;
      myWorld.element.style.bottom = worldH - wrapperH - this.bottom + "px";

  }

}
/*World class*/
function World(width,height){
  this.element = document.createElement("div");
  this.element.id = "world";
  this.parent = document.getElementById("wrapper");
  this.element.style.position = "relative";
  this.setWandH = function(width,height){
    this.element.style.width = width + 'px';
    this.element.style.height = height + 'px';
  }
  this.setWandH(width,height);
  this.setBackgroundColor = function(color){
    this.element.style.backgroundColor=color;
  }
  this.setBackgroundImage = function(b_i){
    this.element.style.backgroundImage = b_i;
  }
  this.append = function() {
    this.parent.appendChild(this.element);
  }
}
  /*create world in wrapper function*/
  function createWorld(width,height){
    myWorld = new World(width,height);
    myWorld.append();
  }
/*levelElem Class*/
function LevelElem(x,y,width,height,id) {
  this.setUp = function(id){
    this.element = document.createElement("div");
    this.parent = document.getElementById("world");
    this.element.style.position = "absolute";
    this.element.id = id;
  }
  this.setUp(id);
  this.setWandH(width,height);
  this.setXandY = function (x,y) {
    this.element.style.left = x + "px";
    this.element.style.bottom = y + "px";
  }
  this.setXandY(x,y);
  this.type = "static";
  this.remove = function() {
    this.parent.removeChild(this.element);
  }
  this.getLeft = function() {
    return parseInt(this.element.style.left);
  }
  this.getBottom = function() {
    return parseInt(this.element.style.bottom);
  }
  this.getRight = function() {
    return parseInt(this.element.style.left) + parseInt(this.element.style.width);
  }
  this.getTop = function() {
    return parseInt(this.element.style.bottom ) + parseInt(this.element.style.height);
  }
  this.getHeight = function () {
    return parseInt(this.element.style.height);
  }
  this.getWidth = function () {
    return parseInt(this.element.style.width);
  }
  this.getHalfWidth = function(){
    return parseInt(this.element.style.width) * 0.5;
  }
  this.getHalfHeight = function() {
    return parseInt(this.element.style.height) * 0.5;
  }
  this.getMidX = function() {
    return this.getHalfWidth() + this.getLeft();
  }
  this.getMidY = function () {
    return this.getHalfHeight() + this.getBottom();
  }
  this.setFrame = function(animation, frame){
      this.element.style.backgroundRepeat="no-repeat";
      this.element.style.backgroundImage = animation[frame][0];
      this.element.style.backgroundPosition=animation[frame][1];
      this.element.style.width = animation[frame][2] + "px";
      this.element.style.height = animation[frame][3] + "px";
    }
}
  LevelElem.prototype = new World();
  /*Level Object Constructor*/
    /*test level*/

  /*mElement Class*/
function MElement(x,y,width,height,id,topRange,bottomRange,vy) {
  this.type = "moving";
  this.setUp(id);
  this.setXandY(x,y);
  this.setWandH(width,height);
  this.vy = vy;
  this.topRange = topRange;
  this.bottomRange = bottomRange;
}
MElement.prototype = new LevelElem();
  /*pickUp class*/
function PickUp (x,y,id) {
  this.type = "pickup";
  this.setUp(id);
  this.setXandY(x,y);

}
PickUp.prototype = new LevelElem();

    /*headcoin pickup*/
function HeadCoin(x,y,id) {
  this.setUp(id);
  this.setXandY(x,y);
  this.setFrame(headCoin,0);
  this.collisionAction = function() {
    this.element.remove();
    return player.addCoin();
  }
}
HeadCoin.prototype = new PickUp;
    /*new ability Pickup*/
function GiveAbility (x,y,id,abilityName) {
  this.setUp(id);
  this.setXandY(x,y);
  this.setFrame(giveAbilityPowerUp,0);

}
GiveAbility.prototype = new PickUp;

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
  /*projectile Class*/
function Projectile(id) {
  this.setUp(id);

}
  Projectile.prototype = new Unit();
  /*Player Class*/
function Player(x,y,id) {
  this.setUp(id);
  this.setXandY(x,y);
  this.facing = true;
  this.maxSpeed = 10;
  this.overrideAnimation = false;
  this.teleAbility = true;
  this.charge = 0;
  this.addTele = function() {
    this.teleAbility = true;
  }
  this.coins = 0;
  this.addCoin = function() {
    this.coins += 1;
    wrapper.coinCount.innerHTML = this.coins;
  }
  this.setFrame(mRunAnimF, 0);
}
  Player.prototype = new Unit();
  Player.prototype.moveLeft = function(){
    if(!this.overrideAnimation) {
      if(keyBool[3]){
        this.facing = false;
        if(this.ax > 0) {
          this.ax = 0;
          if(this.grounded) {
            this.setFrame(mRunAnimB, 0);
          }
        }
        this.ax = this.ax-1;
        if(this.grounded) {
          this.setFrame(mRunAnimB, this.frame);
          if(this.frame < mRunAnimB.length - 1){
            this.frame += 1;
          }
          else {
            this.frame = 0;
          }
        }
        if(keyBool[0]) {
          this.ax = this.ax + 1;
        }
      }
      else if (this.ax <= 0) {
        this.ax = 0;
        if(this.grounded&& !this.facing) {
          this.setFrame(mRunAnimB, 0);
        }
      }
    }
  }
  Player.prototype.moveRight = function(){
    if(!this.overrideAnimation) {
      if(keyBool[0]){
        this.facing = true;
        if(this.ax < 0) {
          this.ax = 0;
          if(this.grounded) {
            this.setFrame(mRunAnimF, 0)
          };
        }
        this.ax = this.ax+1;
        if(this.grounded) {
          this.setFrame(mRunAnimF, this.frame);
          if(this.frame < mRunAnimF.length - 1){
            this.frame += 1;
          }
          else {
            this.frame = 0;
          }
        }
        if(keyBool[3]) {
          this.ax = this.ax - 1;
        }
      }
      else if (this.ax >= 0) {
        this.ax = 0;
        if(this.grounded&&this.facing) {
          this.setFrame(mRunAnimF, 0);
        }
      }
    }
  }
  Player.prototype.shoot = function(){
    if(!this.overrideAnimation) {
      if(!keyBool[2]) {
        if(this.charge<=180){
          this.charge += 1;
          wrapper.energy.style.width = this.charge*2 + "px";
        }
      }
      if(keyBool[2]&&this.charge>=12) {
          var n = projectileArray.length;
          projectileArray["bullet" + n] = new Projectile("bullet" + n);
          projectileArray["bullet" + n].setUp("bullet" + n);
          projectileArray["bullet" + n].element.style.bottom = this.getBottom() + this.getHalfHeight() + "px";
          if(this.facing) {
            projectileArray["bullet" + n].vx = 20;
            projectileArray["bullet" + n].element.style.left = this.getRight() + "px";
          }
          else{
            projectileArray["bullet" + n].vx = -20;
            projectileArray["bullet" + n].element.style.left = this.getLeft() - 5 + "px";
          }
          projectileArray["bullet" + n].vy = 0;
          projectileArray["bullet" + n].setFrame(bullet, 0);
          projectileArray["bullet" + n].damage = 1;
          projectileArray.push(projectileArray["bullet" + n]);
          projectileArray["bullet" + n].append();
          this.charge -= 20;
      }
    }
  }
  Player.prototype.teleport = function(){
    if(this.teleAbility) {
      if(this.facing) {
        if(keyBool[1]&&!this.overrideAnimation) {

          this.frame = 0;
          this.overrideAnimation = true;
        }
        if(keyBool[1]&&this.overrideAnimation){
          this.ax = this.ax*0.73;
          this.ay = 3;
          if(this.frame < 7) {
            this.frame = this.frame + 1;
            this.setFrame(teleF,this.frame);
          }
        }
        else if(this.frame == 7 && !keyBool[1] && this.overrideAnimation){
          var left = parseInt(this.element.style.left);
          var right = left + parseInt(this.element.style.width);

          this.element.style.left = left + 200 + "px";
          if(right > wrapper.innerRight) {
            wrapper.startLeft();
          }
          this.setFrame(teleF, this.frame);
          this.frame +=1;
        }
        else if(!keyBool[1] && this.overrideAnimation) {
          this.overrideAnimation = false;
        }
        else if(this.frame > 7 && this.overrideAnimation) {
          this.setFrame(teleF,this.frame);
          this.frame += 1;
          if (this.frame === teleF.length) {
            this.overrideAnimation = false;
          }
        }
      }
      if(!this.facing) {
        if(keyBool[1]&&!this.overrideAnimation) {
          this.frame = 0;
          this.overrideAnimation = true;
        }
        if(keyBool[1]&&this.overrideAnimation){
          this.ax = this.ax*0.73;
          this.ay = 3;
          if(this.frame < 7) {
            this.frame = this.frame + 1;
            this.setFrame(teleF,this.frame);
          }
        }
        else if(this.frame == 7 && !keyBool[1] && this.overrideAnimation){
          var left = parseInt(this.element.style.left);

          this.element.style.left = left - 200 + "px";
          left = parseInt(this.element.style.left);
          if(left < wrapper.innerLeft) {
            wrapper.startLeft();
          }
          this.setFrame(teleF, this.frame);
          this.frame +=1;
        }
        else if(!keyBool[1] && this.overrideAnimation) {
          this.overrideAnimation = false;
        }
        else if(this.frame > 7 && this.overrideAnimation) {
          this.setFrame(teleF,this.frame);
          this.frame += 1;
          if (this.frame === teleF.length) {
            this.overrideAnimation = false;
          }
        }
      }
    }
  }
  Player.prototype.jump = function() {
    if(!this.overrideAnimation) {
      if(keyBool[4]&&this.grounded == true){
        this.ay = 9.7;
        this.grounded = false;
        this.frame = 1;
        this.facing?this.setFrame(jumpF, 0):this.setFrame(jumpB,0);
      }
      else if(keyBool[4]) {
        this.ay = this.ay*0.85;
        if(this.facing) {
          if (this.frame < jumpF.length -1) {
            this.setFrame(jumpF, this.frame);
            this.frame += 1;
          }
          else {
            this.setFrame(jumpF, 6);
          }
        }
        else {
          if (this.frame < jumpB.length -1) {
            this.setFrame(jumpB, this.frame);
            this.frame += 1;
          }
          else {
            this.setFrame(jumpB, 6);
          }
        }
      }
      else if(this.ay>0) {
        this.ay = this.ay*0.6;
        if(this.facing) {
          if (this.frame < jumpF.length -1) {
            this.setFrame(jumpF, this.frame);
            this.frame += 1;
          }
          else {
            this.setFrame(jumpF, 6);
          }
        }
        else {
          if (this.frame < jumpB.length -1) {
            this.setFrame(jumpB, this.frame);
            this.frame += 1;
          }
          else {
            this.setFrame(jumpB, 6);
          }
        }
      }
    }
  }
  Player.prototype.performAction = function(){
    this.moveRight();
    this.moveLeft();
    this.jump();
    this.shoot();
    this.teleport();
  }
  /*npc class*/
function Cinvert(x,y,id) {
  this.setUp(id);
  this.setXandY(x,y);
  this.setFrame(cinvertMoveB,0);
  this.overrideAnimation = false;
  this.charge =0;
  this.maxSpeed = 7;
  this.facing = false;
  this.facingPlayer = function() {
    if( (player.getMidX() > this.getMidX()) && this.facing ) {
      return true;
    }
    else if( (player.getMidX() < this.getMidX()) && !this.facing) {
      return true;
    }
    else {
      return false;
    }
  }
  /*this.healthBar = document.createElement("div");
  this.element.appendChild(this.healthBar);
  this.healthBar.position = "absolute";
  this.healthBar.style.height = "15px";
  this.healthBar.style.opacity = 0.7;
  this.healthBar.style.width = this.health * 5 + "px";
  this.healthBar.style.bottom = this.getTop() + 60 + "px";
  this.healthBar.style.left = this.getLeft() - 10 + "px";
  this.healthBar.zIndex = "9";
  this.healthBar.style.backgroundColor = "lime";*/
}
  Cinvert.prototype = new Unit();
  Cinvert.prototype.facePlayer = function() {
    if(this.lineOfSight(player) && !this.facingPlayer()){
      if(this.facing){
        this.facing = false;
      }
      else if(!this.facing) {
        this.facing = true;
      }
    }
  }
  Cinvert.prototype.shoot = function(){
      if(this.charge>=24) {
        var n = projectileArray.length;
        projectileArray["bullet" + n] = new Projectile("bullet" + n);
        projectileArray["bullet" + n].setUp("bullet" + n);
        projectileArray["bullet" + n].element.style.bottom = this.getBottom() + this.getHalfHeight() + "px";
        if(this.facing) {
          projectileArray["bullet" + n].vx = 20;
          projectileArray["bullet" + n].element.style.left = this.getRight() + "px";
        }
        else{
          projectileArray["bullet" + n].vx = -20;
          projectileArray["bullet" + n].element.style.left = this.getLeft() - 5 + "px";
        }
        projectileArray["bullet" + n].vy = 0;
        projectileArray["bullet" + n].setFrame(bullet, 0);
        projectileArray["bullet" + n].damage = 1;
        projectileArray.push(projectileArray["bullet" + n]);
        projectileArray["bullet" + n].append();
        this.charge -= 24;
      }
  }
  Cinvert.prototype.chargeUp = function() {
    if(this.charge<180) {
      this.charge += 1;
    }
  }
  Cinvert.prototype.moveLeft = function () {
    if(!this.overrideAnimation) {
      if(this.lineOfSight(player) && this.facingPlayer() && !this.facing){

        if(this.ax > 0) {
          this.ax = 0;
          if(this.grounded) {
            this.setFrame(cinvertMoveB, 0);
          }
        }
        this.ax = this.ax-1;
        if(this.grounded) {
          this.setFrame(cinvertMoveB, this.frame);
          if(this.frame < cinvertMoveB.length - 1){
            this.frame += 1;
          }
          else {
            this.frame = 0;
          }
        }

      }
      else if (this.ax <= 0) {
        this.ax = 0;
        if(this.grounded&& !this.facing) {
          this.setFrame(cinvertMoveB, 0);
        }
      }
    }
  }
  Cinvert.prototype.moveRight = function () {
    if(!this.overrideAnimation) {
      if(this.lineOfSight(player) && this.facingPlayer() && this.facing){

        if(this.ax < 0) {
          this.ax = 0;
          if(this.grounded) {
            this.setFrame(cinvertMoveF, 0)
          };
        }
        this.ax = this.ax+1;
        if(this.grounded) {
          this.setFrame(cinvertMoveF, this.frame);
          if(this.frame < cinvertMoveF.length - 1){
            this.frame += 1;
          }
          else {
            this.frame = 0;
          }
        }

      }
      else if (this.ax >= 0) {
        this.ax = 0;
        if(this.grounded&&this.facing) {
          this.setFrame(cinvertMoveF, 0);
        }
      }
    }

  }
  Cinvert.prototype.performAction = function () {
    this.facePlayer();
    this.chargeUp();
    this.moveRight();
    this.moveLeft();

  }
/*End Classes
*
*
          *
          *
          */

/*Animation Object*/
  var mRunAnimF = [
    ["url('imgs/mmx_xsheet2.png')","-106px -107px", "30", "34"],
    ["url('imgs/mmx_xsheet2.png')","-137px -107px", "20", "34"],
    ["url('imgs/mmx_xsheet2.png')","-158px -106px", "23", "34"],
    ["url('imgs/mmx_xsheet2.png')","-181px -106px", "32", "34"],
    ["url('imgs/mmx_xsheet2.png')","-213px -106px", "34", "34"],
    ["url('imgs/mmx_xsheet2.png')","-247px -106px", "28", "34"],
    ["url('imgs/mmx_xsheet2.png')","-275px -106px", "23", "34"],
    ["url('imgs/mmx_xsheet2.png')","-298px -106px", "25", "34"],
    ["url('imgs/mmx_xsheet2.png')","-326px -107px", "30", "34"],
    ["url('imgs/mmx_xsheet2.png')","-357px -108px", "34", "33"],
    ["url('imgs/mmx_xsheet2.png')","-391px -108px", "30", "33"]
    ];

  var mRunAnimB = [
    ["url('imgs/mmx_xsheet2.png')","-1042px -107px","30","34"],
    ["url('imgs/mmx_xsheet2.png')","-1012px -107px","20","34"],
    ["url('imgs/mmx_xsheet2.png')","-982px -106px","23","35"],
    ["url('imgs/mmx_xsheet2.png')","-938px -107px","32","34"],
    ["url('imgs/mmx_xsheet2.png')","-896px -108px","34","33"],
    ["url('imgs/mmx_xsheet2.png')","-859px -108px","26","33"],
    ["url('imgs/mmx_xsheet2.png')","-825px -107px","22","34"],
    ["url('imgs/mmx_xsheet2.png')","-785px -106px","25","35"],
    ["url('imgs/mmx_xsheet2.png')","-741px -107px","30","34"],
    ["url('imgs/mmx_xsheet2.png')"," -696px -108px","34","33"],
    ["url('imgs/mmx_xsheet2.png')","-656px -108px","29","33"]
  ]

  var jumpF = [
    ["url('imgs/mmx_xsheet2.png')","-128px -758px","20","42"],
    ["url('imgs/mmx_xsheet2.png')","-163px -759px","25","37"],
    ["url('imgs/mmx_xsheet2.png')","-208px -755px","15","44"],
    ["url('imgs/mmx_xsheet2.png')","-237px -755px","23","42"],
    ["url('imgs/mmx_xsheet2.png')","-274px -754px","25","40"],
    ["url('imgs/mmx_xsheet2.png')","-310px -754px","29","38"],
    ["url('imgs/mmx_xsheet2.png')","-354px -754px","29","44"]
  ]

  var jumpB = [
    ["url('imgs/mmx_xsheet2.png')","-928px -758px","20","42"],
    ["url('imgs/mmx_xsheet2.png')","-888px -759px","25","37"],
    ["url('imgs/mmx_xsheet2.png')","-853px -755px","15","44"],
    ["url('imgs/mmx_xsheet2.png')","-816px -755px","23","42"],
    ["url('imgs/mmx_xsheet2.png')","-777px -754px","25","40"],
    ["url('imgs/mmx_xsheet2.png')","-737px -754px","29","38"],
    ["url('imgs/mmx_xsheet2.png')","-693px -754px","29","44"]
  ]

  var bullet = [
      ["url('imgs/mmx_xsheet2.png')" , "-88px -817px" ,"14" ,"14"]
    ]

  var teleB = [
    ["url('imgs/mmx_xsheet2.png')","-399px -702px","18","35"],
    ["url('imgs/mmx_xsheet2.png')","-399px -702px","18","35"],
    ["url('imgs/mmx_xsheet2.png')","-364px -700px","25","38"],
    ["url('imgs/mmx_xsheet2.png')","-364px -700px","25","38"],
    ["url('imgs/mmx_xsheet2.png')","-332px -698px","28","40"],
    ["url('imgs/mmx_xsheet2.png')","-332px -698px","28","40"],
    ["url('imgs/mmx_xsheet2.png')","-483px -695px","33","42"],
    ["url('imgs/mmx_xsheet2.png')","-426px -691px","45","55"],
    ["url('imgs/mmx_xsheet2.png')","-426px -691px","45","55"],
    ["url('imgs/mmx_xsheet2.png')","-483px -695px","33","42"],
    ["url('imgs/mmx_xsheet2.png')","-332px -698px","28","40"]
  ]

  var teleF = [
    ["url('imgs/mmx_xsheet2.png')","-399px -702px","18","35"],
    ["url('imgs/mmx_xsheet2.png')","-399px -702px","18","35"],
    ["url('imgs/mmx_xsheet2.png')","-364px -700px","25","38"],
    ["url('imgs/mmx_xsheet2.png')","-364px -700px","25","38"],
    ["url('imgs/mmx_xsheet2.png')","-332px -698px","28","40"],
    ["url('imgs/mmx_xsheet2.png')","-332px -698px","28","40"],
    ["url('imgs/mmx_xsheet2.png')","-483px -695px","33","42"],
    ["url('imgs/mmx_xsheet2.png')","-426px -691px","45","55"],
    ["url('imgs/mmx_xsheet2.png')","-483px -695px","33","42"],
    ["url('imgs/mmx_xsheet2.png')","332px -698px","28","40"]
  ]

  var headCoin = [
    ["url('imgs/mmx_xsheet2.png')","-354px -754px","29","12"]
  ]

  var giveAbilityPowerUp = [
    ["url('imgs/mmx_xsheet2.png')","-127px -22px","22","29"]
  ]

  var cinvertMoveF = [
    ["url('imgs/mmx_xsheet2.png')","-106px -1106px", "30", "34"],
    ["url('imgs/mmx_xsheet2.png')","-137px -1106px", "20", "34"],
    ["url('imgs/mmx_xsheet2.png')","-158px -1106px", "23", "34"],
    ["url('imgs/mmx_xsheet2.png')","-181px -1106px", "32", "34"],
    ["url('imgs/mmx_xsheet2.png')","-213px -1106px", "34", "34"],
    ["url('imgs/mmx_xsheet2.png')","-247px -1106px", "28", "34"],
    ["url('imgs/mmx_xsheet2.png')","-275px -1106px", "23", "34"],
    ["url('imgs/mmx_xsheet2.png')","-298px -1106px", "25", "34"],
    ["url('imgs/mmx_xsheet2.png')","-326px -1106px", "30", "34"],
    ["url('imgs/mmx_xsheet2.png')","-357px -1106px", "34", "33"],
    ["url('imgs/mmx_xsheet2.png')","-391px -1106px", "30", "33"]
    ];

  var cinvertMoveB = [
    ["url('imgs/mmx_xsheet2.png')","-1042px -1105px","30","34"],
    ["url('imgs/mmx_xsheet2.png')","-1012px -1105px","20","34"],
    ["url('imgs/mmx_xsheet2.png')","-982px -1105px","23","35"],
    ["url('imgs/mmx_xsheet2.png')","-938px -1105px","32","34"],
    ["url('imgs/mmx_xsheet2.png')","-896px -1105px","34","33"],
    ["url('imgs/mmx_xsheet2.png')","-859px -1105px","26","33"],
    ["url('imgs/mmx_xsheet2.png')","-825px -1105px","22","34"],
    ["url('imgs/mmx_xsheet2.png')","-785px -1105px","25","35"],
    ["url('imgs/mmx_xsheet2.png')","-741px -1105px","30","34"],
    ["url('imgs/mmx_xsheet2.png')"," -696px -1105px","34","33"],
    ["url('imgs/mmx_xsheet2.png')","-656px -1105px","29","33"]
  ]

/* */
/*Initiate and Main Function*/
//declare shit for initiate
  level1Declare = function() {
    wrapper = new Wrapper(1100,900,"player");
    myWorld = new World(2000,1500);
    myWorld.setBackgroundColor("black");
     floor1 = new LevelElem(0,0,2000,50,"floor1");
    floor1.setBackgroundColor("blue");
    staticArray.push(floor1);
     floor2 = new LevelElem(1950,50,50,1450,"floor2");
    floor2.setBackgroundColor("blue");
    staticArray.push(floor2);
     floor3 = new LevelElem(0,50,50,1450,"floor3");
    floor3.setBackgroundColor("blue");
    staticArray.push(floor3);
     floor4 = new LevelElem(150,50,150,50,"floor4");
    floor4.setBackgroundColor("blue");
    staticArray.push(floor4);
     floor5 = new LevelElem(300,50,150,100,"floor5");
    floor5.setBackgroundColor("blue");
    staticArray.push(floor5);
     floor6 = new LevelElem(500,200,100,50,"floor6");
    floor6.setBackgroundColor("blue");
    staticArray.push(floor6);
     floor7 = new LevelElem(650,300,100,50,"floor7");
    floor7.setBackgroundColor("blue");
    staticArray.push(floor7);
     floor8 = new LevelElem(800,350,100,50,"floor8");
    floor8.setBackgroundColor("blue");
    staticArray.push(floor8);
     floor9 = new LevelElem(900,450,150,50,"floor9");
    floor9.setBackgroundColor("blue");
    staticArray.push(floor9);
     floor10 = new LevelElem(1100,500,250,100,"floor10");
    floor10.setBackgroundColor("blue");
    staticArray.push(floor10);
     floor11 = new MElement(1450,450,100,50,"floor11",800,200,10);
    floor11.setBackgroundColor("blue");
    staticArray.push(floor11);
    mElementArray.push(floor11);
     floor12 = new LevelElem(1650,450,250,150,"floor12");
    floor12.setBackgroundColor("blue");
    staticArray.push(floor12);
     floor13 = new LevelElem(670,800,500,50,"floor13");
    floor13.setBackgroundColor("blue");
    staticArray.push(floor13);
     floor14 = new LevelElem(50,1450,1900,50,"floor14");
    floor14.setBackgroundColor("blue");
    staticArray.push(floor14);
     floor15 = new LevelElem(800,1230,100,50,"floor15");
    floor15.setBackgroundColor("blue");
    staticArray.push(floor15);

     player = new Player(60,60,"player");
    dynamicArray.push(player);
     headcoin1 = new HeadCoin(540,300, "headcoin1");
    staticArray.push(headcoin1);
     headcoin2 = new HeadCoin(690,400, "headcoin2");
    staticArray.push(headcoin2);
     headcoin3 = new HeadCoin(840,450, "headcoin3");
    staticArray.push(headcoin3);
     headcoin4 = new HeadCoin(945,550, "headcoin4");
    staticArray.push(headcoin4);
     headcoin5 = new HeadCoin(1160,640, "headcoin5");
    staticArray.push(headcoin5);
     headcoin6 = new HeadCoin(1200,680, "headcoin6");
    staticArray.push(headcoin6);
     headcoin7 = new HeadCoin(1250,640, "headcoin7");
    staticArray.push(headcoin7);
     telePowerUp = new GiveAbility(1750,610,"GiveTele","addTele");
    staticArray.push(telePowerUp);
    telePowerUp.collisionAction = function() {
      this.element.remove()
      return player.addTele();
    }
     cinvert1 = new Cinvert(860,60,"cinvert1");
    dynamicArray.push(cinvert1);
    nPCArray.push(cinvert1);

  }
  level1Initiate = function() {
    wrapper.appendBody();
    wrapper.element.appendChild(myWorld.element);
    myWorld.element.appendChild(floor1.element);
    myWorld.element.appendChild(floor2.element);
    myWorld.element.appendChild(floor3.element);
    myWorld.element.appendChild(floor4.element);
    myWorld.element.appendChild(floor5.element);
    myWorld.element.appendChild(floor6.element);
    myWorld.element.appendChild(floor7.element);
    myWorld.element.appendChild(floor8.element);
    myWorld.element.appendChild(floor9.element);
    myWorld.element.appendChild(floor10.element);
    myWorld.element.appendChild(floor11.element);
    myWorld.element.appendChild(floor12.element);
    myWorld.element.appendChild(floor13.element);
    myWorld.element.appendChild(floor14.element);
    myWorld.element.appendChild(floor15.element);

    myWorld.element.appendChild(player.element);
    myWorld.element.appendChild(headcoin1.element);
    myWorld.element.appendChild(headcoin2.element);
    myWorld.element.appendChild(headcoin3.element);
    myWorld.element.appendChild(headcoin4.element);
    myWorld.element.appendChild(headcoin5.element);
    myWorld.element.appendChild(headcoin6.element);
    myWorld.element.appendChild(headcoin7.element);
    myWorld.element.appendChild(telePowerUp.element);
    myWorld.element.appendChild(cinvert1.element);
    wrapper.startLeft();
    wrapper.startBottom();
  }



  testVisibilityLevelDeclare = function () {
      wrapper = new Wrapper(1100,900,"player");
    myWorld = new World(2000,1500);
    myWorld.setBackgroundColor("black");
     floor1 = new LevelElem(0,0,2000,50,"floor1");
    floor1.setBackgroundColor("blue");
    staticArray.push(floor1);
     floor2 = new LevelElem(400,50,100,150,"floor2");
    floor2.setBackgroundColor("blue");
    staticArray.push(floor2);
     floor3 = new LevelElem(350,50,50,50,"floor3");
    floor3.setBackgroundColor("blue");
    staticArray.push(floor3);
     floor4 = new LevelElem(600,250,100,50,"floor4");
    floor4.setBackgroundColor("blue");
    staticArray.push(floor4);
     floor5 = new LevelElem(800,250,200,50,"floor5");
    floor5.setBackgroundColor("blue");
    staticArray.push(floor5);
     floor6 = new LevelElem(950,50,100,100,"floor6");
    floor6.setBackgroundColor("blue");
    staticArray.push(floor6);
     floor7 = new LevelElem(845,50,50,75,"floor7");
    floor7.setBackgroundColor("blue");
    staticArray.push(floor7);
     player = new Player(60,60,"player");
    dynamicArray.push(player);
     cinvert1 = new Cinvert(860,150,"cinvert1");
    dynamicArray.push(cinvert1);
    nPCArray.push(cinvert1);
  }
  testVisibilityLevelInitiate = function() {
    wrapper.appendBody();
    wrapper.element.appendChild(myWorld.element);
    myWorld.element.appendChild(floor1.element);
    myWorld.element.appendChild(floor2.element);
    myWorld.element.appendChild(floor3.element);
    myWorld.element.appendChild(floor4.element);
    myWorld.element.appendChild(floor5.element);
    myWorld.element.appendChild(floor6.element);
    myWorld.element.appendChild(floor7.element);
    myWorld.element.appendChild(player.element);
    myWorld.element.appendChild(cinvert1.element);
    wrapper.startLeft();
    wrapper.startBottom();
  }
  //WHAT LEVEL YOU DECLARING?
  level1Declare();
function ini() {
  //INITIATE SAME LEVEL AS YOU DECLARED
  level1Initiate();
}

function main() {
  physicsEngine(dynamicArray, staticArray);
  checkStates();
  // highlightVisibility();
  //displayVisibility();
  aIAct();
  wrapper.scroll();
  setTimeout(main,1000/45);
}
