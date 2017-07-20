/*
 * ledstrip.js
 * ledstrip sysex library
 */
const CK_COMMAND = 0x40;
const CK_PIXEL_SET = 0x10;
const CK_PIXEL_SHOW = 0x11;
const CK_PIXEL_CLEAR = 0x12;
const CK_PIXEL_BRIGHTNESS = 0x13;
const CK_PIXEL_ALERT_HIGH = 0x14;
const CK_PIXEL_ALERT_LOW = 0x15;

const packColor = function(red, green, blue) {
  red &= 0xFF;
  green &= 0xFF;
  blue &= 0xFF;
  const b1 = red >> 1;
  const b2 = ((red & 0x01) << 6) | (green >> 2);
  const b3 = ((green & 0x03) << 5) | (blue >> 3);
  const b4 = (blue & 0x07) << 4;
  const data = [b1, b2, b3, b4];
  // console.log(data);
  return data;
};

const Ledstrip = function(board) {
  this.board = board;

  /*
   * Configure sysex access to led strip.
   */

  Ledstrip.prototype.hello = function() {
    board.sysexCommand([CK_COMMAND]);
    console.log('ledstrip hello');
  };
  Ledstrip.prototype.clear = function() {
    board.sysexCommand([CK_COMMAND, CK_PIXEL_CLEAR]);
    console.log('ledstrip clear');
  };
  Ledstrip.prototype.show = function() {
    board.sysexCommand([CK_COMMAND, CK_PIXEL_SHOW]);
    console.log('ledstrip show');
  };
  Ledstrip.prototype.setPixelColor = function(pixel, red, green, blue) {
    board.sysexCommand([CK_COMMAND, CK_PIXEL_SET, pixel].concat(packColor(red, green, blue)));
    console.log('ledstrip setPixelColor: r %d, g: %d, b:%d', red, green, blue);
  };
  Ledstrip.prototype.setClearShowPixelColor = function(pixel, red, green, blue) {
    board.sysexCommand([CK_COMMAND, CK_PIXEL_CLEAR]);
    board.sysexCommand([CK_COMMAND, CK_PIXEL_SET, pixel].concat(packColor(red, green, blue)));
    board.sysexCommand([CK_COMMAND, CK_PIXEL_SHOW]);
    console.log('ledstrip setPixelColor: r %d, g: %d, b:%d', red, green, blue);
  };
  Ledstrip.prototype.setBrightness = function(data) {
    board.sysexCommand([CK_COMMAND, CK_PIXEL_BRIGHTNESS, data]);
    console.log('ledstrip brightness');
  };
  Ledstrip.prototype.alertLOW = function() {
    board.sysexCommand([CK_COMMAND, CK_PIXEL_ALERT_LOW]);
    board.sysexCommand([CK_COMMAND, CK_PIXEL_SHOW]);
    console.log('ledstrip alert low');
  };
  Ledstrip.prototype.alertHIGH = function() {
    board.sysexCommand([CK_COMMAND, CK_PIXEL_ALERT_HIGH]);
    board.sysexCommand([CK_COMMAND, CK_PIXEL_SHOW]);
    console.log('ledstrip alert high');
  };
};
module.exports = Ledstrip;
