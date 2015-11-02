/* global reduce, each, testLevel */

// Notes: the start locations in coord objects should always be the top-left corner of the element

// fix things to be able to run tests
if (require) {
  var reduce = require('../utilities/reduce.js');
  var each = require('../utilities/each.js');
  var mapArray = require('../utilities/map.js');
} else {
  // Accidentally used 'map' in logic because I'm used to using Array methods; need to give map a new name here
  var mapArray = map;
}

var mapUtils = {
  processMapRow: function(line, acceptsOne) {
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
        // set the unit to be added to remaining to '_'
        unit = '_';
      } else {
        // If this and the next index are 'X'...
        if (cur === 'X' && nextIndex === 'X') {
          // set the unit to be added to remaining to '_'
          unit = '_';
          // start a new chain...
          prev.chain = true;
          // and add the new chain to our coords collection
          prev.coords.push({start: ind, units: 1});
        // if we are accepting single 'X's and we encounter a single 'X'
        } else if (cur === 'X' && acceptsOne) {
          // set the unit to be added to remaining to '_'
          unit = '_';
          // and add the new unit to our coords collection
          prev.coords.push({start: ind, units: 1});
        }
      }
      prev.remaining.push(unit);
      return prev;
    }, {coords: [], remaining: [], chain: false});

    return {
      coords: processed.coords,
      remaining: processed.remaining,
    };
  }, // - > {coords: [{elemCoordObject}, {elemCoordObject}, etc...], remaining: ['X', '_', '_', etc...]}

  processMap: function(map, unitSize) {
    var horizontal = [];
    var coordinates = [];
    var vertical;

    // process the map as is (horizontal) first. While doing this, rebuild a grid sans the elements we found
    each(map, function(line, yAxis) {
      var processed = mapUtils.processMapRow(line);
      var completed = mapArray(processed.coords, function(incomplete) {
        return {
          x: incomplete.start * 50 + 'px',
          y: yAxis * 50 + 'px',
          height: unitSize + 'px',
          width: incomplete.units * 50 + 'px',
        };
      });
      horizontal.push(processed.remaining);
      coordinates.push(completed);
    });

    // flip the axis and process the map again to catch vertical groups. This time, accept 1 unit groups to be sure we have all elements.
    vertical = mapUtils.rotateRight(horizontal);
    each(vertical, function(line, xAxis) {
      var processed = mapUtils.processMapRow(line, true);
      var completed = mapArray(processed.coords, function(incomplete) {
        return {
          x: xAxis * 50 + 'px',
          y: incomplete.start * 50 + 'px',
          height: incomplete.units * 50 + 'px',
          width: unitSize + 'px',
        };
      });
      coordinates.push(completed);
    });

    // concatMap our coordinate collection
    coordinates = reduce(coordinates, function(prev, cur) {
      return prev.concat(cur);
    });
    return coordinates;
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

module.exports = mapUtils;
