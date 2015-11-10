var render = function(domElement, element) {
  domElement.style.top = element.y + 'px';
  domElement.style.left = element.x + 'px';
  domElement.style.height = element.height + 'px';
  domElement.style.width = element.width + 'px';
  if (element.backgroundImage) {
    domElement.style.backgroundImage = element.backgroundImage;
    domElement.style.backgroundPosition = element.backgroundPosition;
  } else if (element.backgroundColor) {
    domElement.style.backgroundColor = element.backgroundColor;
  }
  element.changed = false;
};

module.exports = render;
