/* global World*/
// levelElem Class
function LevelElem(x, y, width, height, id) {
  this.setUp = function(iD) {
    this.element = document.createElement('div');
    this.parent = document.getElementById('world');
    this.element.style.position = 'absolute';
    this.element.id = iD;
  };
  this.setXandY = function(xLoc, yLoc) {
    this.element.style.left = xLoc + 'px';
    this.element.style.bottom = yLoc + 'px';
  };
  this.remove = function() {
    this.parent.removeChild(this.element);
  };
  this.getLeft = function() {
    return parseInt(this.element.style.left, 10);
  };
  this.getBottom = function() {
    return parseInt(this.element.style.bottom, 10);
  };
  this.getRight = function() {
    return parseInt(this.element.style.left, 10) + parseInt(this.element.style.width, 10);
  };
  this.getTop = function() {
    return parseInt(this.element.style.bottom, 10) + parseInt(this.element.style.height, 10);
  };
  this.getHeight = function() {
    return parseInt(this.element.style.height, 10);
  };
  this.getWidth = function() {
    return parseInt(this.element.style.width, 10);
  };
  this.getHalfWidth = function() {
    return parseInt(this.element.style.width, 10) * 0.5;
  };
  this.getHalfHeight = function() {
    return parseInt(this.element.style.height, 10) * 0.5;
  };
  this.getMidX = function() {
    return this.getHalfWidth() + this.getLeft();
  };
  this.getMidY = function() {
    return this.getHalfHeight() + this.getBottom();
  };
  this.setFrame = function(animation, frame) {
    this.element.style.backgroundRepeat = 'no-repeat';
    this.element.style.backgroundImage = animation[frame][0];
    this.element.style.backgroundPosition = animation[frame][1];
    this.element.style.width = animation[frame][2] + 'px';
    this.element.style.height = animation[frame][3] + 'px';
  };

  this.setUp(id);
  this.setWandH(width, height);
  this.setXandY(x, y);
  this.type = 'static';
}
LevelElem.prototype = new World();
