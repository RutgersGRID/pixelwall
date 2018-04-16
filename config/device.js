let five = require('johnny-five');
let config = require('config');
let Leds = require('../led/LedsHandlerClass.js');

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

  device.leds = new Leds(device.board);

  //set the handler for the led strip
  return device;
};
