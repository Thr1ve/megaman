// check states
checkStates = function() {
  for(var i = 0; i<dynamicArray.length;i++) {
    if(  dynamicArray[i].health <= 0) {
      dynamicArray[i].element.remove();
      dynamicArray.splice(i,1);
      break;
    }
  }
  if( player.health <=0 ) {
    wrapper.coinCount.innerHTML = "YOU DEAD, SON.";
  }
}
