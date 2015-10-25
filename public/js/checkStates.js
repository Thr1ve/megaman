/* global dynamicArray, player, wrapper */
// check states
checkStates = function() {
  var i = 0;
  for (i; i < dynamicArray.length; i++) {
    if (dynamicArray[i].health <= 0) {
      dynamicArray[i].element.remove();
      dynamicArray.splice(i, 1);
      break;
    }
  }
  if (player.health <= 0) {
    wrapper.coinCount.innerHTML = 'YOU DEAD, SON.';
  }
};
