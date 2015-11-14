/* global describe, it */

var assert = require('assert');
var without = require('../public/new/library/utilities/objects/without.js');

describe('without', function() {
  it('should return a new object without the given key', function() {
    var obj = {
      key1: 'value1',
      key2: 'value2',
    };
    var newObj = without(obj, 'key2');
    assert(newObj.key1 === 'value1');
    assert(newObj.key2 === undefined);
  });

  it('should not mutate the original object', function() {
    var obj = {
      key1: 'value1',
      key2: 'value2',
    };
    var newObj = without(obj, 'key2');
    assert(obj.key1 === 'value1');
    assert(obj.key2 === 'value2');
  });

  it('should be able to remove multiple keys', function() {
    var obj = {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3',
    };
    var newObj = without(obj, ['key2', 'key3']);
    assert(newObj.key1 === 'value1');
    assert(newObj.key2 === undefined);
    assert(newObj.key3 === undefined);
  });

  it('should not break if the requested key does not exist', function() {
    var obj = {
      key1: 'value1',
      key2: 'value2',
    };
    var newObj = without(obj, ['key2', 'key3']);
    assert(newObj.key1 === 'value1');
    assert(newObj.key2 === undefined);
    assert(newObj.key3 === undefined);
  });
});
