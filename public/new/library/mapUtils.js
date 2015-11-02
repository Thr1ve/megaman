/* global reduce, each, testLevel */

// Notes: the start locations in coord objects should always be the top-left corner of the element

if (require) {
  var reduce = require('../utilities/reduce.js');
  var each = require('../utilities/each.js');
}

var mapUtils = {
  processMapRow: function(line, direction) {
    // get all groups of 2 or more 'X's such as {start: [Number], units: [Number]} and replace groups with '_'
    // (we will turn these into coordinates and sizes for the element later)
    var processed = reduce(line, function(prev, cur, ind) {
      var curCoords = prev.coords[prev.coords.length - 1];
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
    var newMap = [];
    var coordinates = [];
    // horizontal
    // each(map, function(line) {
    //   var processed = mapUtils.processMapRow(line);
    //   newMap.push(processed.newLine);
    //   coordinates.concat(processed.coords);
    // });
    var rightRotated = mapUtils.rotateRight(map);
    console.log('\n' + map.join('\n'))
    console.log('\n' + rightRotated.join('\n'))
  }, // - > [{elemCoordObject}, {elemCoordObject}, etc...]

  rotateRight: function(map) {
    var width = map[0].length;
    var height = map.length;
    var i = 0;
    var newArr = [];

    var getColumn = function(index) {
      var column = [];
      var j = 0;
      for (j; j < height; j++) {
        column.unshift(map[j][index]);
      }
      return column;
    };

    for (i; i < width; i++) {
      newArr.push(getColumn(i));
    }
    return newArr;
  },
};

// mapUtils.processMap(testLevel.map);

module.exports = mapUtils;
