/* global describe, it */

var assert = require('assert');
var pluck = require('../public/new/library/utilities/collections/pluck.js');

describe('pluck', function() {
  var obj1 = {
    firstName: 'Gordon',
    lastName: 'Buhler',
  };
  var obj2 = {
    firstName: 'Bob',
    middleInitial: 'E',
    lastName: 'Jones',
  };
  var obj3 = {
    firstName: 'Timmy',
    middleInitial: 'T',
    lastName: 'Tiger',
  };
  var collection = [];
  collection.push(obj1);
  collection.push(obj2);
  collection.push(obj3);

  it('should return an array containing the values found at the specified key for each object in the collection', function() {
    var lastNames = pluck(collection, 'lastName');
    assert(lastNames.length === 3);
    assert(lastNames[0] === 'Buhler');
    assert(lastNames[1] === 'Jones');
    assert(lastNames[2] === 'Tiger');
  });

  it('should not break if an object in the collection does not have the key', function() {
    var middleInitials = pluck(collection, 'middleInitial');
    assert(middleInitials[0] === 'E');
    assert(middleInitials[1] === 'T');
    assert(middleInitials.length === 2);
  });
});
