/* global describe, it */

var assert = require('assert');
var objectEquals = require('../public/new/library/utilities/objects/objectEquals.js');

describe('objectEquals', function() {
  it('should correctly identify objects with the same keys / values', function() {
    var object1 = {one: 'hello', two: 'world'};
    var object2 = {one: 'hello', two: 'world'};
    var object3 = {one: 'asdf', two: 'world'};
    assert(objectEquals(object1, object2));
    assert(!objectEquals(object1, object3));
  });
  it('should handle nested arrays', function() {
    var object1 = {one: ['hello', 'world'], two: 'How are you?'};
    var object2 = {one: ['hello', 'world'], two: 'How are you?'};
    assert(objectEquals(object1, object2));
  });
  it('should should handle nested objects', function() {
    var object1 = {one: {hi: 'hello', universe: 'world'}, two: 'Prepare to be invaded!'};
    var object2 = {one: {hi: 'hello', universe: 'world'}, two: 'Prepare to be invaded!'};
    assert(objectEquals(object1, object2));
  });
});
