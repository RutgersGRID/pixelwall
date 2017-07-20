const config = require('config');
const fs = require('fs');
const serialport = require('serialport');
const prompt = require('prompt');

let myConfig = {};

if (config.has('port')) {
  console.log('Current port: %s', config.get('port'));
  myConfig.port = config.get('port');
} else {
  console.log('No port selected yet.');
  myConfig.port = "";
}
if (config.has('ip')) {
  console.log('Current ip: %s', config.get('ip'));
  myConfig.ip = config.get('ip');
} else {
  myConfig.ip = "";
  console.log('No ip selected yet.');
}
prompt.start();
// list serial ports:
console.log('Select serial port by typing it\'s number into the prompt.');
serialport.list(function(err, ports) {
  ports.forEach(function(port, ii) {
    console.log('(%d): %s', ii, port.comName);
  });
  prompt.get(['num'], function(err, result) {
    console.log('Port Selected: %s', ports[result.num].comName);
    myConfig.port = ports[result.num].comName;
    fs.writeFile("./config/default.json", JSON.stringify(myConfig), function(err) {
      if (err) {
        return console.log(err);
      }
    });
    // console.log('Port Selected: %s, ', portName);
  });
});
