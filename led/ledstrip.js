let ledHelper = require('./ledHelper.js');

const CK_COMMAND = 0x40;
const CK_PIXEL_SET = 0x10;
const CK_PIXEL_SHOW = 0x11;
const CK_PIXEL_CLEAR = 0x12;
const CK_PIXEL_BRIGHTNESS = 0x13;
const CK_PIXEL_ALERT_HIGH = 0x14;
const CK_PIXEL_ALERT_LOW = 0x15;

const packPixel = function(pixel) {
  //filter least significant bit (2^7 values)
  const lsb = pixel & 0x7F;
  //shift right 7 bits, giving us vals from 2^8 to 2^14
  const msb = pixel >> 7;
  const data = [lsb, msb];
  return data;
};

const packColor = function(red, green, blue) {
  //filter values to 0 - 255
  red &= 0xFF;
  green &= 0xFF;
  blue &= 0xFF;

  //b1 is red val's 8 bits shifted 1 bit to the right
  //giving us most significant 7 bits of red
  const b1 = red >> 1;
  //b2 is:
  //  least significant red bit shifted to the left 6 bits +
  //  green val's 8 bits shifted 2 bits to the right
  //  giving us the most significant 6 bits of green
  const b2 = ((red & 0x01) << 6) | (green >> 2);
  //b3 is:
  // green's least significant 2 bits, shifted to the left 5 bits
  // and blue's most significant 8 bits shifted to the right by 3 
  // bits giving us the most siginificant 5 bits of blue
  const b3 = ((green & 0x03) << 5) | (blue >> 3);
  // finally b4 is just the remainder of blues least significant bits
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
    board.sysexCommand([CK_COMMAND, CK_PIXEL_SET].concat(packPixel(pixel)).concat(packColor(red, green, blue)));
    console.log('ledstrip setPixelColor: r %d, g: %d, b:%d of pixel %d', red, green, blue, pixel);
  };
  //clears the color of a single pixel
  Ledstrip.prototype.clearPixelColor = function(pixel) {
    board.sysexCommand([CK_COMMAND, CK_PIXEL_SET].concat(packPixel(pixel)).concat(packColor(0,0,0)));
  };
  //data is a unsigned int accepting vals between 0-255 for brightness
  Ledstrip.prototype.setBrightness = function(data) {
    board.sysexCommand([CK_COMMAND, CK_PIXEL_BRIGHTNESS, data]);
  };
  //set all lights to 0x0000FF Blue
  Ledstrip.prototype.hello = function() {
    board.sysexCommand([CK_COMMAND]);
  };
  //set all lights to ICEBLUE 0x000055
  Ledstrip.prototype.alertLOW = function() {
    board.sysexCommand([CK_COMMAND, CK_PIXEL_ALERT_LOW]);
  };
  //set all lights to RED 0xFF0000
  Ledstrip.prototype.alertHIGH = function() {
    board.sysexCommand([CK_COMMAND, CK_PIXEL_ALERT_HIGH]);
  };
};
module.exports = Ledstrip;
