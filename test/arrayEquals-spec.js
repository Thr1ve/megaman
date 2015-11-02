/* global describe, it */

var assert = require('assert');
var arrayEquals = require('../public/new/utilities/arrayEquals.js');

describe('arrayEquals', function() {
  it('should handle nested arrays', function() {
    var map = [
      ['X', 'X', 'X', 'X', 'X'],
      ['X', '_', 'X', '_', 'X'],
      ['X', '_', 'X', '_', 'X'],
      ['X', '_', 'X', 'X', 'X'],
      ['X', 'X', 'X', 'X', 'X'],
    ];
    var map2 = [
      ['X', 'X', 'X', 'X', 'X'],
      ['X', '_', 'X', '_', 'X'],
      ['X', '_', 'X', '_', 'X'],
      ['X', '_', 'X', 'X', 'X'],
      ['X', 'X', 'X', 'X', 'X'],
    ];
    assert(arrayEquals(map, map2));
  });
});
