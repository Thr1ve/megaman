var map = function(arr, func) {
  var i = 0;
  var newArr = [];
  for (i; i < arr.length; i++) {
    newArr.push(func(arr[i]));
  }
};

module.exports = map;
