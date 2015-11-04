/* global describe, it */

var assert = require('assert');
var mapValues = require('../public/new/utilities/mapValues.js');
var objectEquals = require('../public/new/utilities/objectEquals.js');

describe('mapValues', function() {
  it('should properly map values', function() {
    var obj1 = {
      one: 1,
      hello: 3,
      world: 2,
    };
    var expected = {
      one: 2,
      hello: 4,
      world: 3,
    };
    var actual = mapValues(obj1, function(value) {
      return value + 1;
    });
    assert(objectEquals(actual, expected));
  });
});
