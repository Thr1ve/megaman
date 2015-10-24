  /*pickUp class*/
function PickUp (x,y,id) {
  this.type = "pickup";
  this.setUp(id);
  this.setXandY(x,y);

}
PickUp.prototype = new LevelElem();
