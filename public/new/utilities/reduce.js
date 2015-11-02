var reduce = function(arr, func, initial) {
  var i = 0;
  // If we are not given an initial value, remove the first value from our array
  // Otherwise, just use the array we were given
  var newArr = initial ? arr : arr.slice(1);
  // If we are not given an initial value, use the first value of the array we were given
  // Otherwise, use the initial value we were given
  var result = initial ? initial : arr[0];

  for (i; i < newArr.length; i++) {
    // Our func will have the parameters prev, cur, and index
    result = func(result, newArr[i], i);
  }

  return result;
};

module.exports = reduce;
