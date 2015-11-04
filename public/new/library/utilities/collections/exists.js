var exists = function(collection, key, value) {
  // TODO: use better function overloading
  var i = 0;
  if (value !== undefined) {
    for (i; i < collection.length; i++) {
      if (collection[i][key] === value) {
        return true;
      }
    }
    return false;
  }
  for (i; i < collection.length; i++) {
    if (collection[i][key] !== undefined) {
      return true;
    }
  }
  return false;
};

module.exports = exists;
