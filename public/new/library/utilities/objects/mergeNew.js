/* global clone */

var mergeNew = function(oldObj, newObj) {
  var keys = Object.keys(newObj);
  var cloned = clone(oldObj);
  var i = 0;
  for (i; i < keys.length; i++) {
    cloned[keys[i]] = newObj[keys[i]];
  }
  return cloned;
};

module.exports = mergeNew;
