/* global reduce, each, testLevel, idStore */

// Notes: the start locations in coord objects should always be the top-left corner of the element

// This is how a basic Coordinate Object (coordObj) should be structured:
// ```
// {
//   x: 550,
//   y: 300,
//   height: 100,
//   width: 50,
// }
// ```
// We want to mirror this format for the objects in our state collection, storing any necessary specific behaviours / logic on the prototype instead.
// I'm hoping this will make this fast enough for our needs...although I admittedly don't have a very good grasp on what "fast" and "slow" in this context really looks like or if it's even relevant at all...

// fix things to be able to run tests
if (require) {
  var reduce = require('../library/utilities/reduce.js');
  var each = require('../library/utilities/each.js');
  var mapArray = require('../library/utilities/map.js');
} else {
  // Accidentally used 'map' in logic because I'm used to using Array methods; need to give map a new name here
  // TODO: refactor 'map' in below logic to a different name
  var mapArray = map;
}

var mapUtils = {
  getColumn: function(map, index) {
    var column = [];
    var i = 0;
    for (i; i < map.length; i++) {
      column.push(map[i][index]);
    }
    return column;
  },

  rotateRight: function(map) {
    var width = map[0].length;
    var i = 0;
    var newArr = [];

    for (i; i < width; i++) {
      newArr.push(mapUtils.getColumn(map, i).reverse());
    }
    return newArr;
  },

  flipVertical: function(map) {
    var i = 0;
    var newArr = [];
    for (i; i < map.length; i++) {
      newArr.unshift(map[i]);
    }
    return newArr;
  },

  processMapRow: function(line, acceptsOne) {
    // get all groups of 2 or more 'X's such as {start: [Number], units: [Number]} and replace groups with '_'
    // (we will turn these into coordinates and sizes for the element later)
    var processed = reduce(line, function(prev, cur, ind) {
      var curCoords = prev.coords[prev.coords.length - 1];
      var nextIndex = line[ind + 1];
      var unit = cur;
      // If we are currently in a chain
      if (prev.chain) {
        if (cur === 'X') {
          // add length to current coord object
          curCoords.units++;
        }
        // if the next index is not an 'X', stop the chain
        if (nextIndex !== 'X') {
          prev.chain = false;
        }
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
      if (processed.coords.length > 0) {
        var completed = mapArray(processed.coords, function(incomplete) {
          return {
            x: incomplete.start * 50,
            y: yAxis * 50,
            height: unitSize,
            width: incomplete.units * 50,
          };
        });
        coordinates.push(completed);
      }
      horizontal.push(processed.remaining);
    });

    // flip the axis and process the map again to catch vertical groups. This time, accept 1 unit groups to be sure we have all elements.
    vertical = mapUtils.rotateRight(mapUtils.flipVertical(horizontal));
    each(vertical, function(line, xAxis) {
      var processed = mapUtils.processMapRow(line, true);
      if (processed.coords.length > 0) {
        var completed = mapArray(processed.coords, function(incomplete) {
          return {
            x: xAxis * 50,
            y: incomplete.start * 50,
            height: incomplete.units * 50,
            width: unitSize,
          };
        });
        coordinates.push(completed);
      }
    });

    // concatMap our coordinate collection
    coordinates = reduce(coordinates, function(prev, cur) {
      return prev.concat(cur);
    });

    return coordinates;
  }, // - > [{elemCoordObject}, {elemCoordObject}, etc...]
};

module.exports = mapUtils;
