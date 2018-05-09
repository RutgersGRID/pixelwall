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
    brightness: 5,
    width: Number(config.get('width')),
    height: Number(config.get('height')),
    led: '{"index": 0, "color": {"r": 255, "g": 255, "b": 255 }}',
    batch: 25,
    delay: 50
  }

  device.leds = new Leds(device.board, device.properties);

  device.setup = function() {
    device.leds.clear();
    device.leds.setBrightness(device.properties.brightness);
    device.leds.on();
    device.leds.show();
  }

  //set the handler for the led strip
  return device;
};
