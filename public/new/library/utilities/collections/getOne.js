/* global collections */

var getOne = getFirst = function(collection, key, value) {
  var i = 0;
  if (arguments.length < 3) {
    console.warn('Under 3 arguments not yet supported in getOne/getFirst. Please be sure to pass a collection, key, and value');
  }
  for (i; i < collection.length; i++) {
    if (collection[i][key] === value) {
      // should we also return the index ?
      return collection[i];
    }
  }
  return false;
};
