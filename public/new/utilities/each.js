var each = function(arr, func) {
  var i = 0;
  for (i; i < arr.length; i++) {
    func(arr[i]);
  }
};

module.exports = each;
