/* global arrayEquals */

if (require) {
  var arrayEquals = require('./arrayEquals.js');
}

var objectEquals = function(left, right) {
  var i = 0;
  var keys = Object.keys(left);
  if (typeof left !== 'object' || typeof right !== 'object') {
    return false;
  }
  for (i; i < keys.length; i++) {
    if (Array.isArray(left[keys[i]])) {
      if (!arrayEquals(left[keys[i]], right[keys[i]])) {
        return false;
      }
    } else if (left[keys[i]] && typeof left[keys[i]] === 'object') {
      if (!objectEquals(left[keys[i]], right[keys[i]])) {
        return false;
      }
    } else if (left[keys[i]] !== right[keys[i]]) {
      return false;
    }
  }
  return true;
};

module.exports = objectEquals;
