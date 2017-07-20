const config = require('config');
const logger = require('winston');
const five = require('johnny-five');

const board = new five.Board({
  port: config.get('port'),
});

const Ledstrip = require('./ledstrip.js');

const ledstrip = new Ledstrip(board);
const PIN_LED1 = 1; // 1
const PIN_BTN1 = 16; // 16
const MAX_PIXELS = 30;
let button;
let btnStatus;
let pixelCur = 0;

board.on('ready', function() {
  ledstrip.hello();
  ledstrip.clear();
  ledstrip.show();
  ledstrip.setPixelColor();
  ledstrip.hello();
  const led = new five.Led(PIN_LED1);
  led.on();

  button = new five.Button({
    pin: PIN_BTN1,
    invert: true,
  });

  button.on('down', function() {
    btnStatus = 'down';
    led.on();
    ledstrip.setPixelColor(pixelCur += 1, 255, 0, 0);
    ledstrip.show();
    if (pixelCur >= MAX_PIXELS) {
      pixelCur = 0;
      ledstrip.clear();
    }
    logger.log('info', 'down');
  });
});
