
var without = function(obj, keys) {
  // if keys is a string (i.e. we were given a single key), put it in an array
  var keys = typeof keys === 'string' ? [keys] : keys;
  var newObj = {};
  var existingKeys = Object.keys(obj);
  var i = 0;
  for (i; i < existingKeys.length; i++) {
    if (keys.indexOf(existingKeys[i]) === -1) {
      newObj[existingKeys[i]] = obj[existingKeys[i]];
    }
  }
  return newObj;
};

module.exports = without;
