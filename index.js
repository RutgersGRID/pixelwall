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
  ledstrip.show();
});

socket.on('connect', function() {
  //TODO: should probably add the dimmensions of the ledstrip
  //to display dynamically on the front-end side.
  socket.emit('identifier', {type: 'device'});
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
