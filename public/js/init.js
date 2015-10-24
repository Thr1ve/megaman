  //WHAT LEVEL YOU DECLARING?
level1Declare();
function ini() {
  // INITIATE SAME LEVEL AS YOU DECLARED
  level1Initiate();
}

function main() {
  physicsEngine(dynamicArray, staticArray);
  checkStates();
  // highlightVisibility();
  //displayVisibility();
  aIAct();
  wrapper.scroll();
  setTimeout(main,1000/45);
}
