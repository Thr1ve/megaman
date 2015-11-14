/* global describe, it */

var assert = require('assert');
var compose = require('../public/new/library/utilities/compose.js');

describe('compose', function() {
  function square(num) {
    return num * num;
  }
  function timesTwo(num) {
    return num * 2;
  }
  it('should be able to compose two functions', function() {
    var composed = compose(square, timesTwo);
    assert(composed(2) === 16);
  });

  it('should be able to compose an arbitrary number of functions', function() {
    var composed = compose(timesTwo, square, timesTwo);
    assert(composed(2) === 32);
  });
});
