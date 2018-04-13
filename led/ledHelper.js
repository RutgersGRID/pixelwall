//helper functions that extend the functionality of our board
const config = require('config');

module.exports = {
  sortPixel: function(pixelNum, cols, rows) {
    //return the true position of the pixel being sent in.
    //loop through all the odd rows
    for(var i = cols; i < cols*rows; i += 2*cols) {
      //if pixelNum has been passed, was in an even row, just return number
      if(pixelNum < i) {
        return pixelNum;
      }
      //is the current ODD row containing our pixelNum?
      if(pixelNum >= i && pixelNum < i + cols) {
        for(var j = i; j < Math.floor(cols/2) + i; j += 1) {
          let last = (i+cols)-(1+(j-i));
          let first = j;
          if (pixelNum === last) {
            return first;
          }
          else if (pixelNum === first) {
            return last;
          }
        }
      }
      //if not, go to next odd row
    }
    //when pixelNum exceeds last odd row
    return pixelNum;
  },
  sortArray: function(array1D, cols, rows) {
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
  setImage: function(colorsArray, cols, rows) {
    let colors = module.exports.sortArray(colorsArray, cols, row);
    if(colors <= 0) {
      return false;
    }
    else {
      console.log(colors);
      /*
      for(var i = 0; i < cols*rows; i++) {
        ledstrip.setPixelColor(i, colors[i][0], colors[i][1], colors[i][2]);
      }
      */
    }
  } /*
  setImage: function(ledstrip, cols, rows) {
    if(image.length !== 0) {
      let colors = image[0];

      for(var i = 0; i < cols*rows; i++) {
        ledstrip.setPixelColor(i, colors[i][0], colors[i][1], colors[i][2]);
      }
      image.length = 0;
      return true;
    }
    else {
      //case where no images exists
      return false;
    }
  } */
};
