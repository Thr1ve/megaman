/*World class*/
function World(width,height){
  this.element = document.createElement("div");
  this.element.id = "world";
  this.parent = document.getElementById("wrapper");
  this.element.style.position = "relative";
  this.setWandH = function(width,height){
    this.element.style.width = width + 'px';
    this.element.style.height = height + 'px';
  }
  this.setWandH(width,height);
  this.setBackgroundColor = function(color){
    this.element.style.backgroundColor=color;
  }
  this.setBackgroundImage = function(b_i){
    this.element.style.backgroundImage = b_i;
  }
  this.append = function() {
    this.parent.appendChild(this.element);
  }
}
  /*create world in wrapper function*/
  function createWorld(width,height){
    myWorld = new World(width,height);
    myWorld.append();
  }
