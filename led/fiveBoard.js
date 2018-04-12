let config = require('config');
let five = require('johnny-five');

module.exports = function() {
  let fiveBoard = new five.Board({
    port: config.get('port'),
    repl: false
  });

  //set the fiveBoard properties
  fiveBoard.properties = {
    on: true,
    brightness: 15,
    width: Number(config.get('width')),
    height: Number(config.get('height'))
  }

  return fiveBoard;
};
