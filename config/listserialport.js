const fs = require('fs');
const fileExists = require('file-exists');

module.exports = {
  existsConfig: function(callback) {
    fileExists('./config/default.json', function(err, exists) {
      callback(err,exists);
    })
  },
  makeConfig: function(input) {
    fs.writeFile('/config/default.json', input, function(err) {
      if(err) throw err;
    });
  },
  getPort: function(configFile) {
    if(configFile.has('port')) {
      return configFile.get('port');
    }
    else {
      console.log("Config file has no port value.");
      return '';
    }
  },
  getIP: function(configFile) {
    if(configFile.has('ip')) {
      return configFile.get('ip');
    }
    else {
      console.log("Config file has no ip value.");
      return '';
    }
  },
  getConfirmation: function()
};

/*const config = require('config');
const fs = require('fs');
const serialport = require('serialport');
const prompt = require('prompt');

let myConfig = {};

prompt.start();
// list serial ports:
console.log('Select serial port by typing it\'s number into the prompt.');
serialport.list(function(err, ports) {
  ports.forEach(function(port, i) {
    console.log('(%d): %s', i, port.comName);
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
*/
