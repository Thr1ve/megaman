/* global describe, it */

var assert = require('assert');
var exists = require('../public/new/utilities/collections/exists.js');

describe('exists', function() {
  var collection = [
    {
      'firstName': 'fred',
      'lastName': 'flinstone',
    },
    {
      'firstName': 'tony',
      'lastName': 'tiger',
    },
    {
      'firstName': 'thomas',
      'lastName': 'pynchon',
    },
  ];
  it('given key and value, it should return false if an object with the key/value does not exist', function() {
    assert(!exists(collection, 'firstName', 'bob'));
  });
  it('given key and value, it should return true if an object with the key/value exists', function() {
    assert(exists(collection, 'firstName', 'thomas'));
  });
  it('given only a key, it should return false if an object with the key does not exist', function() {
    assert(!exists(collection, 'nonexistentKey'));
  });
  it('given only a key, it should return true if an object with the key exists', function() {
    assert(exists(collection, 'firstName'));
  });
});
