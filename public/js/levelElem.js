
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
