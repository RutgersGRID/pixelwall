const config = require('config');

let cols = Number(config.width);
let rows = Number(config.height);

let image = [];

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
  pushImage: function(colorsArray) {
    let colors = module.exports.sortArray(colorsArray);
    image = [colors];

    return true;
  },
  setImage: function(ledstrip) {
    if(image !== []) {
      let colors = image[0];

      for(var i = 0; i < cols*rows; i++) {
        ledstrip.setPixelColor(i, colors[i][0], colors[i][1], colors[i][2]);
      }
      ledstrip.show();
    }
    else {
      //case where no images exists
    }
  }
};
