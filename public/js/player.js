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
};
