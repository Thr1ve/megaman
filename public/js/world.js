// World class*
function World(width, height) {
  this.element = document.createElement('div');
  this.element.id = 'world';
  this.parent = document.getElementById('wrapper');
  this.element.style.position = 'relative';
  this.setWandH = function(wd, hgt) {
    this.element.style.width = wd + 'px';
    this.element.style.height = hgt + 'px';
  };
  this.setWandH(width, height);
  this.setBackgroundColor = function(color) {
    this.element.style.backgroundColor = color;
  };
  this.setBackgroundImage = function(image) {
    this.element.style.backgroundImage = image;
  };
  this.append = function() {
    this.parent.appendChild(this.element);
  };
}
