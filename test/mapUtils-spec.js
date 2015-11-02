/* global describe, it */

var assert = require('assert');
var arrayEquals = require('../public/new/utilities/arrayEquals.js');
var mapUtils = require('../public/new/library/mapUtils.js');

describe('mapUtils', function() {
  var line = ['X', '_', '_', '_', 'X', 'X', '_', '_', 'X', 'X', 'X', 'X', '_', '_', '_', '_', 'X' ];
  var processedLine = mapUtils.processMapRow(line);
  describe('#processMapRow', function() {
    it('should return an object', function() {
      assert(typeof(processedLine) === 'object');
    });
    it('should return an object with the keys "coords" and "newLine"', function() {
      var keys = Object.keys(processedLine);
      assert(keys.indexOf('coords') !== -1);
      assert(keys.indexOf('newLine') !== -1);
    });
    it('should return an object with a "newLine" array that has a length as long as the old line', function() {
      assert(processedLine.newLine.length === line.length);
    });
    it('should correctly replace all "X" chains with "_"', function() {
      assert(arrayEquals(processedLine.newLine, ['X', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', 'X' ]));
    });
  });
  describe('#processMap', function() {
  });
});
