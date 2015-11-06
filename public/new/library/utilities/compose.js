// TODO: create reduceRight
var compose = function() {
  var args = Array.prototype.slice.call(arguments, 0);
  return function(arg) {
    return args.reduceRight(function(prev, cur) {
      return cur(prev);
    }, arg);
  };
};

module.exports = compose;
