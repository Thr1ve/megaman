var setFrame = function(animation, frame) {
  var element = {};
  // if we just got a single image, we don't need to pick a frame...
  if (frame === undefined) {
    element.backgroundImage = animation[0];
    element.backgroundPosition = animation[1];
    element.width = animation[2];
    element.height = animation[3];
  // otherwise, pick the frame
  } else {
    element.backgroundImage = animation[frame][0];
    element.backgroundPosition = animation[frame][1];
    element.width = animation[frame][2];
    element.height = animation[frame][3];
  }
  return element;
};

function Animation(spriteArray) {
  this.spriteArray = spriteArray;
}

Animation.prototype.nextFrame = function(currentFrame) {
  return currentFrame === this.spriteArray.length ? this.spriteArray[0] : this.spriteArray[currentFrame];
};
