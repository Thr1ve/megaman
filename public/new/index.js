/* global IdStore, createLevel, testLevel */
// World was:
  // width 2000
  // height 1500
// Wrapper was:
  // width 1100
  // height 900

var idStore = new IdStore;

var initialize = function() {
  var level = createLevel(testLevel);
  console.log(level);
  document.body.appendChild(level);
};

var mainLoop = function() {

};
