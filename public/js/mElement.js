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
