const config = require('config');
const five = require('johnny-five');
const LEDStrip = require('./ledstrip.js');
const ledmanager = require('./ledmanager.js');

const board = new five.Board({
  port: config.get('port'),
});

const ledstrip = new LEDStrip(board);

board.on('ready', function() {
  ledstrip.clear();
  ledstrip.setBrightness(3);

  //TODO: Accept json data for images
  let dispTime = 250; //in milliseconds

  let colorArray = [
    [179, 70, 109], [243, 90, 120], [250, 135, 140], [243, 220, 176], [0, 0, 0],
    [179, 70, 109], [243, 90, 120], [250, 135, 140], [0, 0, 0], [254, 222, 139],
    [179, 70, 109], [243, 90, 120], [0, 0, 0], [243, 220, 176], [254, 222, 139],
    [179, 70, 109], [0, 0, 0], [250, 135, 140], [243, 220, 176], [254, 222, 139],
    [0, 0, 0], [243, 90, 120], [250, 135, 140], [243, 220, 176], [254, 222, 139]
  ];
  let colorArray1 = [
    [179, 70, 109], [243, 90, 120], [250, 135, 140], [243, 220, 176], [254, 222, 139],
    [179, 70, 109], [243, 90, 120], [250, 135, 140], [243, 220, 176], [254, 222, 139],
    [179, 70, 109], [243, 90, 120], [250, 135, 140], [243, 220, 176], [254, 222, 139],
    [179, 70, 109], [243, 90, 120], [250, 135, 140], [243, 220, 176], [254, 222, 139],
    [179, 70, 109], [243, 90, 120], [250, 135, 140], [243, 220, 176], [254, 222, 139]
  ];
  ledmanager.pushImage(colorArray, dispTime);
  ledmanager.pushImage(colorArray1, dispTime);

  ledmanager.setImage(ledstrip);

  //TODO: Loop eternally checking for 2 things
  //1: new data pushed by server
  //2: time for new image to be displayed
});
