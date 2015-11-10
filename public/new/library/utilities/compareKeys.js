
var compareKeys = function(obj1, obj2) {
  var keys = Object.keys(obj1);
  var i = 0;
  for (i; i < keys.length; i++) {
    if (obj1[keys[i]] !== obj2[keys[i]]) {
      return false;
    }
  }
  return true;
};

module.exports = compareKeys;
