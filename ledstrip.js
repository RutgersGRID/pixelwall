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
  return data;
};

const Ledstrip = function(board) {
  this.board = board;
  /*
   * Configure sysex access to led strip.
   */
  //clear entire LED strip
  Ledstrip.prototype.clear = function() {
    board.sysexCommand([CK_COMMAND, CK_PIXEL_CLEAR]);
  };
  //displays current state of pixels on strip
  Ledstrip.prototype.show = function() {
    board.sysexCommand([CK_COMMAND, CK_PIXEL_SHOW]);
  };
  //sets the color of a single pixel
  Ledstrip.prototype.setPixelColor = function(pixel, red, green, blue) {
    board.sysexCommand([CK_COMMAND, CK_PIXEL_SET, pixel].concat(packColor(red, green, blue)));
    console.log('ledstrip setPixelColor: r %d, g: %d, b:%d of pixel %d', red, green, blue, pixel);
  };
  //clears the color of a single pixel
  Ledstrip.prototype.clearPixelColor = function(pixel) {
    board.sysexCommand([CK_COMMAND, CK_PIXEL_SET, pixel].concat(packColor(0, 0, 0)));
  };
  //data is a unsigned int accepting vals between 0-255 for brightness
  Ledstrip.prototype.setBrightness = function(data) {
    board.sysexCommand([CK_COMMAND, CK_PIXEL_BRIGHTNESS, data]);
  };
  //set all lights to 0x0000FF Blue
  Ledstrip.prototype.hello = function() {
    board.sysexCommand([CK_COMMAND]);
    console.log('ledstrip hello');
  };
  //set all lights to ICEBLUE 0x000055
  Ledstrip.prototype.alertLOW = function() {
    board.sysexCommand([CK_COMMAND, CK_PIXEL_ALERT_LOW]);
    console.log('ledstrip alert low');
  };
  //set all lights to RED 0xFF0000
  Ledstrip.prototype.alertHIGH = function() {
    board.sysexCommand([CK_COMMAND, CK_PIXEL_ALERT_HIGH]);
    console.log('ledstrip alert high');
  };
};
module.exports = Ledstrip;
