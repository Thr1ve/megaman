/* global reduce */

if (require) {
  var reduce = require('../reduce.js');
}

// https://github.com/rackt/redux/blob/master/src%2Futils%2FmapValues.js

var mapValues = function(obj, func) {
  return reduce(Object.keys(obj), function(result, key) {
    result[key] = func(obj[key], key);
    return result;
  }, {});
};

module.exports = mapValues;
