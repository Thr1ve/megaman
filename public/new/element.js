/* global idStore */

var Element = function(coordObj, background, listening) {

  // The unique ID for this element
  this.id = idStore.create();

  // Coordinates
  this.y = coordObj.y;
  this.x = coordObj.x;

  // Velocity
  this.xVelocity = 0;
  this.yVelocity = 0;

  // Max Velocity
  this.maxVelocity = 10;

  // Acceleration
  this.xAcceleration = 0;
  this.yAcceleration = 0;

  // Whether or not this element has changed this cycle and needs to be re-rendered
  // This defaults to true in order to initially render the element.
  // Currently, our render function will set this back to false after rendering
  this.changed = true;

  this.frame = 0;
  this.animating = false;

  // Whether or not this element should try to resolve collisions with other elements
  this.resolveCollisions = false;

  // Whether or not this element is affected by physics
  // TODO: get rid of this bullshit
  this.affectedByPhysics = false;

  // Whether or not this element is listening for player input
  if (listening) {
    this.listening = true;
  }

  // if we were given a simple color (string)
  if (typeof background === 'string') {
    // we have backgroundColor property
    this.backgroundColor = background;
    this.width = coordObj.width;
    this.height = coordObj.height;
  } else if (typeof background === 'object' && background !== null) {
    // otherwise, we have a backgroundImage (array) property
    this.backgroundImage = background.backgroundImage;
    this.backgroundPosition = background.backgroundPosition;
    this.width = background.width;
    this.height = background.height;
  }

  // Create our element and store a reference to it
  this.createElement();
};

Element.prototype.position = 'absolute';
Element.prototype.backgroundRepeat = 'no-repeat';

Element.prototype.createElement = function() {
  this.domElement = document.createElement('div');
  this.domElement.id = this.id;
  this.domElement.style.position = this.position;
  this.domElement.style.backgroundRepeat = this.backgroundRepeat;
};
