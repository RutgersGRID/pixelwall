let five = require('johnny-five');
let config = require('config');
let LEDStrip = require('../led/ledStrip.js');

module.exports = function() {
  let device = {};

  device.board = new five.Board({
    port: config.get('port'),
    repl: false
  });

  //set the board properties
  device.properties = {
    on: true,
    brightness: 15,
    width: Number(config.get('width')),
    height: Number(config.get('height'))
  }

  device.ledStrip = new LEDStrip(device.board);

  //set the handler for the led strip
  return device;
};
