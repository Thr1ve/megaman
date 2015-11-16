/* global describe, it */

var assert = require('assert');
var idStore = require('../public/new/IdStore.js');

describe('IdStore', function() {
  var newId, newId2;
  describe('#create', function() {
    it('should push the id to the ids array', function() {
      newId = idStore.create();
      assert(idStore.getLength() === 1);
      newId2 = idStore.create();
      assert(idStore.getLength() === 2);
    });
  });
  describe('#exists', function() {
    it('should return true if the id exists in our store', function() {
      assert(idStore.exists(newId));
      assert(idStore.exists(newId2));
    });
  });
  describe('#remove', function() {
    it('should remove 1 from the length of our store', function() {
      idStore.remove(newId);
      assert(idStore.getLength() === 1);
    });
    it('should remove the correct id', function() {
      assert(!idStore.exists(newId));
      assert(idStore.exists(newId2));
    });
    it('should remove nothing if the id does not exist', function() {
      idStore.remove(newId);
      assert(idStore.getLength() === 1);
    });
  });
});
