class Sysex {
  constructor(board, properties) {
    this.board = board;
    this.properties = properties;

    this.CK_COMMAND = 0x40;
    this.CK_PIXEL_SET = 0x10;
    this.CK_PIXEL_SHOW = 0x11;
    this.CK_PIXEL_CLEAR = 0x12;
    this.CK_PIXEL_BRIGHTNESS = 0x13;
    this.CK_PIXEL_ALERT_HIGH = 0x14;
    this.CK_PIXEL_ALERT_LOW = 0x15;
  }

  packPixel(pixel) {
    //get least significant bits(2^7 values)
    const lsb = pixel & 0x7F;
    //shift right 7 bits, giving us vals from 2^8 to 2^14
    const msb = pixel >> 7;
    const data = [lsb, msb];
    return data;
  }

  packColor(red, green, blue) {
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
  }

  //set all lights to 0xFFFFFF
  on() {
    this.board.sysexCommand([this.CK_COMMAND]);
  }

  //clear entire LED strip
  clear() {
    this.board.sysexCommand([this.CK_COMMAND, this.CK_PIXEL_CLEAR]);
  }

  //displays current state of pixels on strip
  show() {
    this.board.sysexCommand([this.CK_COMMAND, this.CK_PIXEL_SHOW]);
  }

  //sets the color of a single pixel
  setPixelColor(pixel, red, green, blue) {
    this.board.sysexCommand([this.CK_COMMAND, this.CK_PIXEL_SET]
      .concat(this.packPixel(pixel))
      .concat(this.packColor(red, green, blue)));
    console.log('ledstrip setPixelColor: r %d, g: %d, b:%d of pixel %d', red, green, blue, pixel);
  }

  //clears the color of a single pixel
  clearPixelColor(pixel) {
    this.board.sysexCommand([this.CK_COMMAND, this.CK_PIXEL_SET]
      .concat(this.packPixel(pixel))
      .concat(this.packColor(0,0,0)));
  }

  //data is an unsigned int accepting vals between 0-255 for brightness
  setBrightness(data) {
    this.board.sysexCommand([this.CK_COMMAND, this.CK_PIXEL_BRIGHTNESS, data]);
  }

  //set all lights to ICEBLUE 0x000055
  alertLOW() {
    this.board.sysexCommand([this.CK_COMMAND, this.CK_PIXEL_ALERT_LOW]);
  }

  //set all lights to RED 0xFF0000
  alertHIGH() {
    this.board.sysexCommand([this.CK_COMMAND, this.CK_PIXEL_ALERT_HIGH]);
  }

}

module.exports = Sysex;
