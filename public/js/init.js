  //WHAT LEVEL YOU DECLARING?
function initialize(level) {
level1Declare();
  // INITIATE SAME LEVEL AS YOU DECLARED
  level1Initiate();
  main()
}

function main() {
  physicsEngine(dynamicArray, staticArray);
  checkStates();
  // highlightVisibility();
  // displayVisibility();
  aIAct();
  wrapper.scroll();
  setTimeout(main, 1000 / 45);
}
