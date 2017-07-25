const listSerialPort = require('./listserialport.js');
const config = require('config');
const prompt = require('prompt');

listSerialPort.existsConfig(function(err, exists) {
  if(exists) {
    let port = listSerialPort.getPort(config);
    let ip = listSerialPort.getIP(config);

    if(port !== '') {
      console.log('Current port: ' + port);
    }
    else {
      console.log('No port value in config file');
    }
    if(ip !== '') {
      console.log('Current ip: ' + ip);
    }
    else {
      console.log('No ip value in config file');
    }

    console.log("Would you like to update these values? (Y/N)");
    prompt.start();
    let conditions = {
      name:'confirmation',
      validator: /^[Y|y](es|ES)?$|^[N|n][O|o]?$/,
      warning: 'Must respond yes(Y) or no(N)'
    };

    let portCond = {
      name: 'num',
      validator: /^\d+$/,
      warning: 'Select a number from the list'
    };

    prompt.get(conditions, function(err, result) {
      if(result.confirmation[0].toLowerCase() == 'y') {
        prompt.get(['num'], function(err, val) {
          console.log(val.num);
        });
      }
      else {
        return;
      }
    });

  }
  else {
    //file doesn't exist
  }
});
