const config = require('config');
const five = require('johnny-five');
const LEDStrip = require('./ledstrip.js');

const board = new five.Board({
  port: config.get('port'),
});

const ledstrip = new LEDStrip(board);
//const PIN_LED1 = 1; // 1
//const PIN_BTN1 = 23; // 16
//let button;
//let btnStatus;
let curPixel = 0;

board.on('ready', function() {
  ledstrip.setBrightness(3);
  ledstrip.clear();

  ledstrip.setPixelColor(0, 179, 70, 109);
  ledstrip.setPixelColor(1, 243, 90, 120);
  ledstrip.setPixelColor(2, 250, 135, 140);
  ledstrip.setPixelColor(3, 243, 220, 176);
  ledstrip.setPixelColor(4, 254, 222, 139);
  ledstrip.setPixelColor(5, 229, 227, 214);
  ledstrip.setPixelColor(6, 166, 158, 147);
  ledstrip.setPixelColor(7, 125, 149, 159);
  ledstrip.setPixelColor(8, 105, 183, 232);
  ledstrip.setPixelColor(9, 31, 159, 170);
  ledstrip.setPixelColor(10, 179, 70, 109);
  ledstrip.setPixelColor(11, 243, 90, 120);
  ledstrip.setPixelColor(12, 250, 135, 140);
  ledstrip.setPixelColor(13, 243, 220, 176);
  ledstrip.setPixelColor(14, 254, 222, 139);
  ledstrip.setPixelColor(15, 229, 227, 214);
  ledstrip.setPixelColor(16, 166, 158, 147);
  ledstrip.setPixelColor(17, 125, 149, 159);
  ledstrip.setPixelColor(18, 105, 183, 232);
  ledstrip.setPixelColor(19, 31, 159, 170);
  ledstrip.setPixelColor(20, 179, 70, 109);
  ledstrip.setPixelColor(21, 243, 90, 120);
  ledstrip.setPixelColor(22, 250, 135, 140);
  ledstrip.setPixelColor(23, 243, 220, 176);
  ledstrip.setPixelColor(24, 254, 222, 139);

  ledstrip.show();

/*  for(var i = 1; i < 25; i = i + 2) {
    ledstrip.clearPixelColor(i);
  }
  ledstrip.show();
  */
});
