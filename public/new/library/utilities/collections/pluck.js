var pluck = function(collection, key) {
  var newArr = [];
  var i = 0;
  for (i; i < collection.length; i++) {
    if (collection[i][key]) {
      newArr.push(collection[i][key]);
    }
  }
  return newArr;
};

module.exports = pluck;
