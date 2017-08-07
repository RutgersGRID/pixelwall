/* Imaging requires accepting arrays of RGB values
and time duration for current 'frame'. Also requires
a display manager. A queue of requests that are trigerred
in the right order.
*/
const config = require('config');
const linkedlist = require('linkedlist');

let cols = Number(config.width);
let rows = Number(config.height);

let list = new linkedlist();

module.exports = {
  sortArray: function(array1D) {
    //expected input is a 1D array
    //n inputs of type [R,G,B].

    //deep copy of array being returned, original untouched
    let newArray = array1D.slice();
    //flip every other row to account for physical ordering
    for(var i = cols; i < cols*rows; i += 2*cols) {
      for(var j = i; j < Math.floor(cols/2) + i; j += 1) {
        let last = newArray[(i+cols)-(1+(j-i))];
        let first = newArray[j];
        newArray[(i+cols)-(1+(j-i))] = first;
        newArray[j] = last;
      }
    }
    //array should now have every other row flipped
    return newArray;
  },
  pushImage: function(colorsArray, dispTime) {
    let colors = module.exports.sortArray(colorsArray);
    let data = [colors, dispTime];
    list.push(data);

    return;
  },
  getNextImage: function() {
    //retrieves the next available image and removes from head of list
    if(list.head !== 'undefined') {
      return list.shift();
    }
    else {
      return false;
    }
  },
  setImage: function(ledstrip) {
    let image = module.exports.getNextImage();
    if(image) {
      let colors = image[0];
      let time = image[1];

      for(var i = 0; i < cols*rows; i++) {
        ledstrip.setPixelColor(i, colors[i][0], colors[i][1], colors[i][2]);
      }
      ledstrip.show();

      //seems like a temporary solution.
      //possibly a deltaT function would be better? But
      //then that requires constantly checking deltaT until
      //value satisfied. Which might be okay if we are
      //also periodically checking for new content
      setTimeout(function() {
        module.exports.setImage(ledstrip);
      }, time);
    }
    else {
      //case where no images left
    }
  }
};
