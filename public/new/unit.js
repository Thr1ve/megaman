/* global Element, ANIMATIONS */

var Unit = function(coordObj, animations) {
  if (arguments.length < 2) {
    // remind myself
    console.error('You need to give a Unit an object containing animations as the second parameter');
  }
  this.y = coordObj.y;
  this.x = coordObj.x;
  this.frame = 0;
  this.changed = false;
  this.backgroundImage = animations.resting;
  this.currentAnimation = this.backgroundImage;
  this.createElement();
  this.setAnimations(animations);
};

// Delegate to  Element prototype
Unit.prototype = Object.create(Element.prototype);
// Reassign prototype constructor
Unit.prototype.constructor = Unit;

Unit.prototype.setAnimations = function(animations) {
  this.animations = animations;
};
