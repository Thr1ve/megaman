var clone = function(obj, props) {
  var keys = props || Object.keys(obj);
  var i = 0;
  var newObj = {};
  for (i; i < keys.length; i++) {
    newObj[keys[i]] = obj[keys[i]];
  }
  return newObj;
};

module.exports = clone;
