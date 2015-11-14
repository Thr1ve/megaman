/* global map, collections */

function Animation(spriteArray) {
  this.frames = map(spriteArray, function(sprite, ind) {
    return {
      backgroundImage: sprite[0],
      backgroundPosition: sprite[1],
      width: sprite[2],
      height: sprite[3],
      frame: ind + 1,
    };
  });
  this.length = this.frames.length;
  // we should make this deepFreeze once we write deepFreeze
  Object.freeze(this);
}

Animation.prototype.getNextFrame = function(currentFrame, loop) {
  var loop = loop || true;
  if (currentFrame === this.length) {
    if (loop) {
      return collections.getOne(this.frames, 'frame', 1);
    }
    return false;
  }
  return collections.getOne(this.frames, 'frame', currentFrame + 1);
};

Animation.prototype.getPreviousFrame = function(currentFrame, loop) {
  var loop = loop || true;
  if (currentFrame === 0) {
    if (loop) {
      return collections.getOne(this.frames, 'frame', this.length);
    }
    return false;
  }
  return collections.getOne(this.frames, 'frame', currentFrame - 1);
};

Animation.prototype.getFrame = function(frameNumber) {
  return collections.getOne(this.frames, 'frame', frameNumber);
};
