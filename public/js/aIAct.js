/* global nPCArray */
aIAct = function() {
  var i = 0;
  for (i; i < nPCArray.length; i++) {
    nPCArray[i].performAction();
  }
};
