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
    batch: 25,
    delay: 50
  }

  device.leds = new Leds(device.board, device.properties);

  device.setup = function() {
    let initialDesign = [];
    for(let i = 0; i < device.properties.width*device.properties.height; i++) {
      initialDesign.push([255, 255, 255]);
    }

    device.leds.clear();
    device.leds.setBrightness(device.properties.brightness);
    device.leds.setImage(initialDesign, device.properties.width, device.properties.height);
    device.leds.show();
  }

  //set the handler for the led strip
  return device;
};
