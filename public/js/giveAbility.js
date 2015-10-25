/* global PickUp, giveAbilityPowerUp */
// new ability Pickup
function GiveAbility(x, y, id, abilityName) {
  this.setUp(id);
  this.setXandY(x, y);
  this.setFrame(giveAbilityPowerUp, 0);
}

GiveAbility.prototype = new PickUp;
