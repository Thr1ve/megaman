var merge = function(oldObj, newObj) {
  var keys = Object.keys(newObj);
  var i = 0;
  for (i; i < keys.length; i++) {
    oldObj[keys[i]] = newObj[keys[i]];
  }
  return oldObj;
};

module.exports = merge;
