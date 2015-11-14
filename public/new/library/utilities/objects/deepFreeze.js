var deepFreeze = function(obj) {
  var keys = Object.keys(obj);
  var i = 0;
  for (i; i < keys.length; i++) {
    if (obj[keys[i]] !== null && typeof obj[keys[i]] === 'object') {
      return deepFreeze(obj[keys[i]]);
    }
  }
  Object.freeze(obj);
};

module.exports = deepFreeze;
