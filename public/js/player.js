/* global this.wrapper, mRunAnimF, mRunAnimB, Unit, keyBool, projectileArray, Projectile, bullet, teleF, jumpF, jumpB */
// Player Class
function Player(x, y, id, wrapper) {
  this.wrapper = wrapper;
  this.setUp(id);
  this.setXandY(x, y);
  this.facing = true;
  this.maxSpeed = 10;
  this.overrideAnimation = false;
  this.teleAbility = true;
  this.charge = 0;
  this.addTele = function() {
    this.teleAbility = true;
  };
  this.coins = 0;
  this.addCoin = function() {
    this.coins += 1;
    this.wrapper.coinCount.innerHTML = this.coins;
  };
  this.setFrame(mRunAnimF, 0);
}

Player.prototype = new Unit();

Player.prototype.moveLeft = function() {
  if (!this.overrideAnimation) {
    // if 'a'(left) is pressed...
    if (keyBool[3]) {
    // set face prop to left, remove right acceleration, and change to left-facing sprite:
      // ...face the player left..
      this.facing = false;
      // ...and if our acceleration to the right is greater than 0..
      if (this.ax > 0) {
        // ...set it to zero...
        this.ax = 0;
        // ...and if we're on the ground...
        if (this.grounded) {
          // ...set the frame to the left-facing sprite
          this.setFrame(mRunAnimB, 0);
        }
      }

      // Give ourselves some left acceleration...
      this.ax = this.ax - 1;
      // If we're on the ground...
      if (this.grounded) {
        // ...update our sprite to the next in the running animation
        this.setFrame(mRunAnimB, this.frame);
        // ... and increment the frame or, if we're at the end, repeat the animation
        if (this.frame < mRunAnimB.length - 1) {
          this.frame += 1;
        } else {
          this.frame = 0;
        }
      }
      // If we're pressing 'd'(right) at the same time, give ourselves some right acceleration
      if (keyBool[0]) {
        this.ax = this.ax + 1;
      }
    // if there is any left acceleration
    } else if (this.ax <= 0) {
      // set it to 0
      this.ax = 0;
      // and if we're on the ground and facing left...
      if (this.grounded && !this.facing) {
        // make sure our sprite is the correct left-facing sprite
        this.setFrame(mRunAnimB, 0);
      }
    }
  }
};

Player.prototype.moveRight = function() {
  if (!this.overrideAnimation) {
    if (keyBool[0]) {
      this.facing = true;
      if (this.ax < 0) {
        this.ax = 0;
        if (this.grounded) {
          this.setFrame(mRunAnimF, 0);
        }
      }
      this.ax = this.ax + 1;
      if (this.grounded) {
        this.setFrame(mRunAnimF, this.frame);
        if (this.frame < mRunAnimF.length - 1) {
          this.frame += 1;
        } else {
          this.frame = 0;
        }
      }
      if (keyBool[3]) {
        this.ax = this.ax - 1;
      }
    } else if (this.ax >= 0) {
      this.ax = 0;
      if (this.grounded && this.facing) {
        this.setFrame(mRunAnimF, 0);
      }
    }
  }
};
Player.prototype.shoot = function() {
  var n;
  if (!this.overrideAnimation) {
    if (!keyBool[2]) {
      if (this.charge <= 180) {
        this.charge += 1;
        this.wrapper.energy.style.width = this.charge * 2 + 'px';
      }
    }
    if (keyBool[2] && this.charge >= 12) {
      n = projectileArray.length;
      projectileArray['bullet' + n] = new Projectile('bullet' + n);
      projectileArray['bullet' + n].setUp('bullet' + n);
      projectileArray['bullet' + n].element.style.bottom = this.getBottom() + this.getHalfHeight() + 'px';
      if (this.facing) {
        projectileArray['bullet' + n].vx = 20;
        projectileArray['bullet' + n].element.style.left = this.getRight() + 'px';
      } else {
        projectileArray['bullet' + n].vx = -20;
        projectileArray['bullet' + n].element.style.left = this.getLeft() - 5 + 'px';
      }
      projectileArray['bullet' + n].vy = 0;
      projectileArray['bullet' + n].setFrame(bullet, 0);
      projectileArray['bullet' + n].damage = 1;
      projectileArray.push(projectileArray['bullet' + n]);
      projectileArray['bullet' + n].append();
      this.charge -= 20;
    }
  }
};

Player.prototype.teleport = function() {
  var left, right;
  if (this.teleAbility) {
    if (this.facing) {
      if (keyBool[1] && !this.overrideAnimation) {
        this.frame = 0;
        this.overrideAnimation = true;
      }
      if (keyBool[1] && this.overrideAnimation) {
        this.ax = this.ax * 0.73;
        this.ay = 3;
        if (this.frame < 7) {
          this.frame = this.frame + 1;
          this.setFrame(teleF, this.frame);
        }
      } else if (this.frame === 7 && !keyBool[1] && this.overrideAnimation) {
        left = parseInt(this.element.style.left, 10);
        right = left + parseInt(this.element.style.width, 10);

        this.element.style.left = left + 200 + 'px';
        if (right > this.wrapper.innerRight) {
          this.wrapper.startLeft();
        }
        this.setFrame(teleF, this.frame);
        this.frame += 1;
      } else if (!keyBool[1] && this.overrideAnimation) {
        this.overrideAnimation = false;
      } else if (this.frame > 7 && this.overrideAnimation) {
        this.setFrame(teleF, this.frame);
        this.frame += 1;
        if (this.frame === teleF.length) {
          this.overrideAnimation = false;
        }
      }
    }
    if (!this.facing) {
      if (keyBool[1] && !this.overrideAnimation) {
        this.frame = 0;
        this.overrideAnimation = true;
      }
      if (keyBool[1] && this.overrideAnimation) {
        this.ax = this.ax * 0.73;
        this.ay = 3;
        if (this.frame < 7) {
          this.frame = this.frame + 1;
          this.setFrame(teleF, this.frame);
        }
      } else if (this.frame === 7 && !keyBool[1] && this.overrideAnimation) {
        left = parseInt(this.element.style.left, 10);
        this.element.style.left = left - 200 + 'px';
        left = parseInt(this.element.style.left, 10);
        if (left < this.wrapper.innerLeft) {
          this.wrapper.startLeft();
        }
        this.setFrame(teleF, this.frame);
        this.frame += 1;
      } else if (!keyBool[1] && this.overrideAnimation) {
        this.overrideAnimation = false;
      } else if (this.frame > 7 && this.overrideAnimation) {
        this.setFrame(teleF, this.frame);
        this.frame += 1;
        if (this.frame === teleF.length) {
          this.overrideAnimation = false;
        }
      }
    }
  }
};

Player.prototype.jump = function() {
  if (!this.overrideAnimation) {
    // if jump key is pressed and player is grounded
    if (keyBool[4] && this.grounded === true) {
      // add vertical acceleration
      this.ay = 9.7;
      // set grounded to false
      this.grounded = false;
      this.frame = 1;
      // play the jump animation for the direction we're facing
      this.facing ? this.setFrame(jumpF, 0) : this.setFrame(jumpB, 0);
    // if jump key is pressed and player is already in the air
    } else if (keyBool[4]) {
      // reduce our vertical acceleration
      this.ay = this.ay * 0.85;
      if (this.facing) {
        if (this.frame < jumpF.length - 1) {
          this.setFrame(jumpF, this.frame);
          this.frame += 1;
        } else {
          this.setFrame(jumpF, 6);
        }
      } else {
        if (this.frame < jumpB.length - 1) {
          this.setFrame(jumpB, this.frame);
          this.frame += 1;
        } else {
          this.setFrame(jumpB, 6);
        }
      }
    } else if (this.ay > 0) {
      this.ay = this.ay * 0.6;
      if (this.facing) {
        if (this.frame < jumpF.length - 1) {
          this.setFrame(jumpF, this.frame);
          this.frame += 1;
        } else {
          this.setFrame(jumpF, 6);
        }
      } else {
        if (this.frame < jumpB.length - 1) {
          this.setFrame(jumpB, this.frame);
          this.frame += 1;
        } else {
          this.setFrame(jumpB, 6);
        }
      }
    }
  }
};

Player.prototype.performAction = function() {
  this.moveRight();
  this.moveLeft();
  this.jump();
  this.shoot();
  this.teleport();
};
