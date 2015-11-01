// World constructor
function World(width, height, color) {
  this.setWandH = function(wd, hgt) {
    this.element.style.width = wd + 'px';
    this.element.style.height = hgt + 'px';
  };
  this.setBackgroundColor = function(c) {
    this.element.style.backgroundColor = c;
  };
  this.setBackgroundImage = function(image) {
    this.element.style.backgroundImage = image;
  };
  this.append = function() {
    this.parent.appendChild(this.element);
  };

  this.element = document.createElement('div');
  this.element.id = 'world';
  this.parent = document.getElementById('wrapper');
  this.element.style.position = 'relative';
  this.setWandH(width, height);
  this.setBackgroundColor(color);
}
