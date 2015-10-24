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
