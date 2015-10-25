/* global PickUp, headCoin, player */
// headcoin pickup
function HeadCoin(x, y, id) {
  this.setUp(id);
  this.setXandY(x, y);
  this.setFrame(headCoin, 0);
  this.collisionAction = function() {
    this.element.remove();
    return player.addCoin();
  };
}

HeadCoin.prototype = new PickUp;
