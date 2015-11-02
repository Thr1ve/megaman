/* global describe, it */

var assert = require('assert');
var reduce = require('../public/new/utilities/reduce.js');

describe('reduce', function() {
  var arr1 = [0, 1, 2, 3, 4];
  it('should be able to add an array of numbers', function() {
    var added = reduce(arr1, function(prev, cur) {
      return prev + cur;
    });
    assert(added === 10);
  });
  it('should be able to use an initial value', function() {
    var added = reduce(arr1, function(prev, cur) {
      return prev + cur;
    }, 3);
    assert(added === 13);
  });
});
