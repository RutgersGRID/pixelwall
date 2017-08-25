/*
The led strip is treated solely as a
display. It expects images as input, and
immediately displays whatever image it
receives from a socket emit from the server.

How long it displays images for is handled
by the server by sending the next image whenever
the current image's time is up.
*/

const config = require('config');
const five = require('johnny-five');
const LEDStrip = require('./ledstrip.js');
const ledmanager = require('./ledmanager.js');
const socket = require('socket.io-client')('http://localhost:3000');

let boardReady = false;
let initialDesign = [
  [255,255,255], [255,255,255], [255,255,255], [255,255,255], [255,255,255],
  [255,255,255], [255,255,255], [255,255,255], [255,255,255], [255,255,255],
  [255,255,255], [255,255,255], [255,255,255], [255,255,255], [255,255,255],
  [255,255,255], [255,255,255], [255,255,255], [255,255,255], [255,255,255],
  [255,255,255], [255,255,255], [255,255,255], [255,255,255], [255,255,255]
];

const board = new five.Board({
  port: config.get('port'),
  repl: false
});
const ledstrip = new LEDStrip(board);

board.on('ready', function() {
  //set up for when board first turns on
  boardReady = true;
  ledstrip.clear();
  ledstrip.setBrightness(3);
  ledmanager.pushImage(initialDesign);
  ledmanager.setImage(ledstrip);
});

//must always send the initial design, even if all leds turned off
socket.on('connect', function() {
  socket.emit('identifier', {
    type: 'device',
    dimmensions: {
      width: Number(config.width),
      height: Number(config.height)
    },
    boardState: initialDesign
  });
});

socket.on('read', function(data) {
  if(boardReady) {
    switch(data.type) {
      case 'single-pixel':
        let newPixelNum = ledmanager.sortPixel(data.pixel);
        ledstrip.setPixelColor(newPixelNum, data.color[0], data.color[1], data.color[2]);
        ledstrip.show();
        break;
      case 'all-pixels':
        ledmanager.pushImage(data.colors);
        ledmanager.setImage(ledstrip);
        break;
      default:
        break;
    }
  }
});
