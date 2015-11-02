/* global reduce */

// Notes: the start locations in coord objects should always be the bottom-left corner of the element

if (require) {
  var reduce = require('../utilities/reduce.js');
}
var mapUtils = {
  processMapRow: function(line) {
    // get all groups of 2 or more 'X's such as {length: [Number], index: [Number]} and replace groups with '_'
    // (we will turn these into coordinates and sizes for the element later)
    var processed = reduce(line, function(prev, cur, ind) {
      var length = prev.coords.length;
      var curCoords = prev.coords[length - 1];
      var nextIndex = line[ind + 1];
      var unit = cur;
      // If we are currently in a chain
      if (prev.chain) {
        // if the next index is not an 'X', stop the chain
        if (cur !== 'X') {
          prev.chain = false;
        }
        // add length to current coord object
        curCoords.units++;
        // set the unit to be added to newLine to '_'
        unit = '_';
      } else {
        // If this and the next index are 'X'...
        if (cur === 'X' && nextIndex === 'X') {
          // set the unit to be added to newLine to '_'
          unit = '_';
          // start a new chain...
          prev.chain = true;
          // and add the new chain to our coords collection
          prev.coords.push({start: ind, units: 1});
        }
      }
      prev.newLine.push(unit);
      return prev;
    }, {coords: [], newLine: [], chain: false});

    return {
      coords: processed.coords,
      newLine: processed.newLine,
    };
  }, // - > {coords: [{elemCoordObject}, {elemCoordObject}, etc...], newLine: ['X', '_', '_', etc...]}

  processMap: function(map, unitSize) {

  }, // - > [{elemCoordObject}, {elemCoordObject}, etc...]
};

module.exports = mapUtils;
