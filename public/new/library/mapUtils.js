var mapUtils = {
  processMapRow: function(line, unitSize) {
    // get all groups of 2 or more 'X's such as {length: [Number], index: [Number]} and replace groups with '_'
      // (we will turn these into coordinates and sizes for the element later)
    // loop through line units
      // if unit and the next unit are 'X'
        // push '_' into our newLine

    // return {
    //   coords: elemCoordsArray,
    //   newLine: newLine,
    // };
  }, // - > {coords: [{elemCoordObject}, {elemCoordObject}, etc...], newLine: ['X', '_', '_', etc...]}
  processMap: function(map, unitSize) {

  }, // - > [{elemCoordObject}, {elemCoordObject}, etc...]
};

module.exports = mapUtils;
