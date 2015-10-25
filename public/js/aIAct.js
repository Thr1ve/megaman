/* global nPCArray */
var aIAct = function() {
  var i = 0;
  for (i; i < nPCArray.length; i++) {
    nPCArray[i].performAction();
  }
};

aIAct = aIAct;
