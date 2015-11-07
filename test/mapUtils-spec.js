/* global describe, it */

var assert = require('assert');
var arrayEquals = require('../public/new/library/utilities/arrayEquals.js');
var objectEquals = require('../public/new/library/utilities/objectEquals.js');
var mapUtils = require('../public/new/library/mapUtils.js');

describe('mapUtils', function() {
  describe('#processMapRow', function() {
    var line = ['X', '_', '_', '_', 'X', 'X', '_', '_', 'X', 'X', 'X', 'X', '_', '_', '_', '_', 'X' ];
    var processedLine = mapUtils.processMapRow(line);
    it('should return an object', function() {
      assert(typeof(processedLine) === 'object');
    });
    it('should return an object with the keys "coords" and "remaining"', function() {
      var keys = Object.keys(processedLine);
      assert(keys.indexOf('coords') !== -1);
      assert(keys.indexOf('remaining') !== -1);
    });
    it('should return an object with a "remaining" array that has a length as long as the old line', function() {
      assert(processedLine.remaining.length === line.length);
    });
    it('should correctly replace all "X" chains with "_"', function() {
      assert(arrayEquals(processedLine.remaining, ['X', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', 'X' ]));
    });
  });

  describe('#getColumn', function() {
    var getColumn = mapUtils.getColumn;
    it('should correctly get a column from a 2d array', function() {
      var map = [
        ['X', '_', '_', '_'],
        ['X', '_', '_', '_'],
        ['_', '_', '_', '_'],
        ['_', '_', '_', '_'],
      ];
      assert(arrayEquals(getColumn(map, 0), ['X', 'X', '_', '_']));
    });
  });

  describe('#rotateRight', function() {
    var rotateRight = mapUtils.rotateRight;
    var map = [
      ['X', 'X', 'X', '_'],
      ['_', '_', '_', '_'],
      ['_', '_', '_', '_'],
      ['_', '_', '_', '_'],
    ];
    var rotatedRightMap = [
      ['_', '_', '_', 'X'],
      ['_', '_', '_', 'X'],
      ['_', '_', '_', 'X'],
      ['_', '_', '_', '_'],
    ];
    var map2 = [
      ['_', '_', '_', '_'],
      ['_', '_', '_', '_'],
      ['X', '_', '_', 'X'],
      ['X', '_', '_', 'X'],
    ];
    var rotatedRightMap2 = [
      ['X', 'X', '_', '_'],
      ['_', '_', '_', '_'],
      ['_', '_', '_', '_'],
      ['X', 'X', '_', '_'],
    ];
    it('should correctly rotate the map clockwise', function() {
      assert(arrayEquals(rotateRight(map), rotatedRightMap));
      assert(arrayEquals(rotateRight(map2), rotatedRightMap2));
    });
  });

  describe('#flipVertical', function() {
    var flipVertical = mapUtils.flipVertical;
    var map = [
      ['X', '_', 'X', '_'],
      ['_', 'X', '_', 'X'],
      ['_', '_', '_', '_'],
      ['_', '_', '_', '_'],
    ];
    var flippedMap = [
      ['_', '_', '_', '_'],
      ['_', '_', '_', '_'],
      ['_', 'X', '_', 'X'],
      ['X', '_', 'X', '_'],
    ];
    it('should correctly vertically flip a map', function() {
      console.log('\n' + flipVertical(map).join('\n'));
      assert(arrayEquals(flipVertical(map), flippedMap));
    });
  });

  describe('#processMap', function() {
    var processMap = mapUtils.processMap;

    it('should not mutate the map', function() {
      var map = [
        ['X', 'X', '_', '_'],
        ['_', '_', 'X', 'X'],
        ['X', 'X', '_', '_'],
        ['_', '_', 'X', 'X'],
      ];
      var mapCopy = [
        ['X', 'X', '_', '_'],
        ['_', '_', 'X', 'X'],
        ['X', 'X', '_', '_'],
        ['_', '_', 'X', 'X'],
      ];
      processMap(map, 50);
      assert(arrayEquals(map, mapCopy));
    });

    it('should correctly create horizontal elements', function() {
      var i = 0;
      var map = [
        ['X', 'X', '_', '_'],
        ['_', '_', 'X', 'X'],
        ['X', 'X', '_', '_'],
        ['_', '_', 'X', 'X'],
      ];
      var actual = processMap(map, 50);
      var expected = [
        { x: 0, y: 0, height: 50, width: 100},
        { x: 100, y: 50, height: 50, width: 100},
        { x: 0, y: 100, height: 50, width: 100},
        { x: 100, y: 150, height: 50, width: 100},
      ];
      for (i; i < expected.length; i++) {
        assert(objectEquals(actual, expected));
      }
    });

    it('should correctly create vertical elements', function() {
      var i = 0;
      var map = [
        ['X', '_', '_', 'X'],
        ['X', '_', '_', 'X'],
        ['_', 'X', '_', 'X'],
        ['_', 'X', '_', 'X'],
      ];
      var actual = processMap(map, 50);
      var expected = [
        { x: 0, y: 0, height: 100, width: 50},
        { x: 50, y: 100, height: 100, width: 50},
        { x: 150, y: 0, height: 200, width: 50},
      ];
      for (i; i < expected.length; i++) {
        assert(objectEquals(actual[i], expected[i]));
      }
    });

    it('should correctly catch non-grouped units', function() {
      var i = 0;
      var map = [
        ['X', '_', '_', '_'],
        ['_', '_', '_', '_'],
        ['_', '_', '_', '_'],
        ['_', 'X', '_', '_'],
      ];
      var actual = processMap(map, 50);
      var expected = [
        { x: 0, y: 0, height: 50, width: 50},
        { x: 50, y: 150, height: 50, width: 50},
      ];
      for (i; i < expected.length; i++) {
        assert(objectEquals(actual[i], expected[i]));
      }
    });
  });
});
