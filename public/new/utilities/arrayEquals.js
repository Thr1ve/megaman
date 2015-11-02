var arrayEquals = function(left, right) {
  var i = 0;
  if (left.length !== right.length) {
    return false;
  }
  for (i; i < left.length; i++) {
    if (left[i] !== right[i]) {
      return false;
    }
  }
  return true;
};

module.exports = arrayEquals;
