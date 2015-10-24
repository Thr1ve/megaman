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
