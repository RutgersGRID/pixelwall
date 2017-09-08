let assert = require('chai').assert;
let ledmanager = require('../ledmanager.js');

describe('led manager', function() {
  let cols, rows, led;
  before(function() {
    cols = 3;
    rows = 3;
    led = {
      setPixelColor: function(index, r, g, b) {return true;}
    };
  });
  
  after(function() {
    cols = null;
    rows = null;
    led = null;
  });

  it('should sort any incoming pixel', function() {
    assert.notEqual(ledmanager.sortPixel(0, cols, rows), 2);
    assert.equal(ledmanager.sortPixel(0, cols, rows), 0);
    assert.notEqual(ledmanager.sortPixel(3, cols, rows), 3);
    assert.equal(ledmanager.sortPixel(3, cols, rows), 5);
  });

  it('should not sort pixels outside led dimmensions', function() {
    assert.equal(ledmanager.sortPixel(-5, cols, rows), -5);
    assert.equal(ledmanager.sortPixel(12, cols, rows), 12);
  });

  it('should sort odd rows of an array', function() {
    //first row is 0, even
    assert.deepEqual(
      ledmanager.sortArray(
        [[0,0,0], [1,1,1], [2,2,2],
         [3,3,3], [4,4,4], [5,5,5],
         [6,6,6], [7,7,7], [8,8,8]],
         cols, rows
      ),
      [[0,0,0], [1,1,1], [2,2,2],
       [5,5,5], [4,4,4], [3,3,3],
       [6,6,6], [7,7,7], [8,8,8]]
    );
    assert.notDeepEqual(
      ledmanager.sortArray([[0,0,0], [1,1,1], [2,2,2]], 3, 1),
      [[2,2,2], [1,1,1], [0,0,0]]
    );
  });

  it('should push and set the image', function() {
    assert.isOk(ledmanager.pushImage([[1,1,1]], 1, 1));
    assert.isOk(ledmanager.setImage(led, 1, 1));
  });

  it('should fail to set image if not pushed first', function() {
    assert.isNotOk(ledmanager.setImage(led, 1, 1));
  })
});
