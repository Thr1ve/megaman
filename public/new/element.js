/* global idStore */

var Element = function(coordObj, background) {
  // Set up our simple state values
  this.y = coordObj.y;
  this.x = coordObj.x;
  this.width = coordObj.width;
  this.height = coordObj.height;
  this.frame = 0;
  this.changed = false;
  this.animating = false;
  // if we got a simple color (string)
  if (typeof background === 'string') {
    // we have backgroundColor property
    this.backgroundColor = background;
  } else if (Array.isArray(background)) {
    // otherwise, we have a backgroundImage property
    this.backgroundImage = background;
  }

  // Create our element and store a reference to it
  this.createElement();
};

Element.prototype.createElement = function() {
  this.DOMelement = document.createElement('div');
  this.DOMelement.id = idStore.create();
  this.DOMelement.style.position = 'absolute';
  this.DOMelement.style.backgroundRepeat = 'no-repeat';
};

Element.prototype.getId = function() {
  return this.DOMelement.id;
};

Element.prototype.render = function() {
  // Set the DOMelement's current location
  this.DOMelement.style.top = this.y + 'px';
  this.DOMelement.style.left = this.x + 'px';

  // If the element is animating...
  if (this.animating) {
    // ...call setFrame to set the background image, width, and height
    this.setFrame(this.currentAnimation, this.frame);
  // If it has a color...
  } else if (this.backgroundColor) {
    this.DOMelement.style.backgroundColor = this.backgroundColor;
  // If it just has a single image...
  } else if (this.backgroundImage) {
    this.setFrame(this.backgroundImage);
  }
  this.DOMelement.style.width = this.width + 'px';
  this.DOMelement.style.height = this.height + 'px';
};

Element.prototype.setFrame = function(animation, frame) {
  // if we just got a single image, we don't need to pick a frame...
  if (frame === undefined) {
    this.DOMelement.style.backgroundImage = animation[0];
    this.DOMelement.style.backgroundPosition = animation[1];
    this.width = animation[2];
    this.height = animation[3];
  // otherwise, pick the frame
  } else {
    this.DOMelement.style.backgroundImage = animation[frame][0];
    this.DOMelement.style.backgroundPosition = animation[frame][1];
    this.width = animation[frame][2];
    this.height = animation[frame][3];
  }
};
