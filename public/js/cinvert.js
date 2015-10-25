/* global Projectile, bullet, projectileArray, Unit, player, cinvertMoveB, cinvertMoveF */
// npc class
function Cinvert(x, y, id) {
  this.setUp(id);
  this.setXandY(x, y);
  this.setFrame(cinvertMoveB, 0);
  this.overrideAnimation = false;
  this.charge = 0;
  this.maxSpeed = 7;
  this.facing = false;
  this.facingPlayer = function() {
    if ((player.getMidX() > this.getMidX()) && this.facing ) {
      return true;
    } else if ((player.getMidX() < this.getMidX()) && !this.facing) {
      return true;
    }
    return false;
  };
  /* this.healthBar = document.createElement('div');
  this.element.appendChild(this.healthBar);
  this.healthBar.position = 'absolute';
  this.healthBar.style.height = '15px';
  this.healthBar.style.opacity = 0.7;
  this.healthBar.style.width = this.health * 5 + 'px';
  this.healthBar.style.bottom = this.getTop() + 60 + 'px';
  this.healthBar.style.left = this.getLeft() - 10 + 'px';
  this.healthBar.zIndex = '9';
  this.healthBar.style.backgroundColor = 'lime'; */
}

Cinvert.prototype = new Unit();

Cinvert.prototype.facePlayer = function() {
  if (this.lineOfSight(player) && !this.facingPlayer()) {
    if (this.facing) {
      this.facing = false;
    } else if (!this.facing) {
      this.facing = true;
    }
  }
};

Cinvert.prototype.shoot = function() {
  var n;
  if (this.charge >= 24) {
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
    this.charge -= 24;
  }
};

Cinvert.prototype.chargeUp = function() {
  if (this.charge < 180) {
    this.charge += 1;
  }
};

Cinvert.prototype.moveLeft = function() {
  if (!this.overrideAnimation) {
    if (this.lineOfSight(player) && this.facingPlayer() && !this.facing) {
      if (this.ax > 0) {
        this.ax = 0;
        if (this.grounded) {
          this.setFrame(cinvertMoveB, 0);
        }
      }
      this.ax = this.ax - 1;
      if (this.grounded) {
        this.setFrame(cinvertMoveB, this.frame);
        if (this.frame < cinvertMoveB.length - 1) {
          this.frame += 1;
        } else {
          this.frame = 0;
        }
      }
    } else if (this.ax <= 0) {
      this.ax = 0;
      if (this.grounded && !this.facing) {
        this.setFrame(cinvertMoveB, 0);
      }
    }
  }
};

Cinvert.prototype.moveRight = function() {
  if (!this.overrideAnimation) {
    if (this.lineOfSight(player) && this.facingPlayer() && this.facing) {
      if (this.ax < 0) {
        this.ax = 0;
        if (this.grounded) {
          this.setFrame(cinvertMoveF, 0);
        }
      }
      this.ax = this.ax + 1;
      if (this.grounded) {
        this.setFrame(cinvertMoveF, this.frame);
        if (this.frame < cinvertMoveF.length - 1) {
          this.frame += 1;
        } else {
          this.frame = 0;
        }
      }
    } else if (this.ax >= 0) {
      this.ax = 0;
      if (this.grounded && this.facing) {
        this.setFrame(cinvertMoveF, 0);
      }
    }
  }
};

Cinvert.prototype.performAction = function() {
  this.facePlayer();
  this.chargeUp();
  this.moveRight();
  this.moveLeft();
};
