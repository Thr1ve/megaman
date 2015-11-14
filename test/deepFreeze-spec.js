/* global describe, it */

var assert = require('assert');
var deepFreeze = require('../public/new/library/utilities/objects/deepFreeze.js');

describe('deepFreeze', function() {
  it('should freeze an objects properties', function() {
    var obj = {foo: 'bar'};
    deepFreeze(obj);
    obj.foo = 'notbar';

    assert(obj.foo === 'bar');
  });

  it('should handle nested objects', function() {
    var obj = {
      foo: 'bar',
      nested: {
        hello: 'world',
      },
    };
    deepFreeze(obj);
    obj.nested.hello = 'UNIVERSE';

    assert(obj.nested.hello === 'world');
  });

  it('should handle nested arrays', function() {
    var obj = {
      foo: 'bar',
      nested: {
        hello: [
          'a string',
          {sup: 'dude'},
        ],
      },
    };
    deepFreeze(obj);
    obj.nested.hello[1].sup = 'ASDFASDF';

    assert(obj.nested.hello[1].sup === 'dude');
  });
});
