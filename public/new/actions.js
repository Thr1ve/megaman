
var moveLeft = function(element, keys) {
  if (keys.d) {
    element.xAcceleration += 1;
  } else if (element.xAcceleration >= 0) {
    element.xAcceleration = 0;
  }
  return element;
};

var moveRight = function(element, keys) {
  if (keys.a) {
    element.xAcceleration -= 1;
  } else if (element.xAcceleration <= 0) {
    element.xAcceleration = 0;
  }
  return element;
};

var processKeys = function(element, keys) {
  // This can be a reduce function
  moveRight(element, keys);
  moveLeft(element, keys);
  return element;
};
