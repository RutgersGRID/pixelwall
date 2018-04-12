const helper = require('./config/setup/helper.js');
const config = require('config');
const serialport = require('serialport');


helper.existsConfig(function(err, exists) {
  if(!exists) {
    console.log('No config file found, creating a new one');
  }
  else {
    let port = helper.getPort(config);
    let ip = helper.getIP(config);

    if(port !== '') console.log('Current port: ' + port);
    else console.log('No port value in config file');
    if(ip !== '') console.log('Current ip: ' + ip);
    else console.log('No ip value in config file');
  }

  helper.startPrompt();

  serialport.list(function(err, ports) {
    if(ports.length <= 0) {
      console.log('Unfortunately no device was detected on this computer.');
      return;
    }
    else {
      console.log('Please select a port');
      ports.forEach(function(port, i) {
        console.log('(%d): %s', i, port.comName);
      });
      helper.getPortPrompt(ports.length, function(err, result) {
        console.log("Please set the width and height of your LED wall");
        helper.getWidthHeightPrompt(function(err, dimmensions) {
          //Now need to update/create our JSON file
          if(exists) {
            helper.updateConfigFile(ports[result.num].comName, dimmensions, function(err) {
              if(err) return console.log(err);
              return;
            });
          }
          else {
            helper.createConfigFile(ports[result.num].comName, dimmensions, function(err) {
              if(err) return console.log(err);
              return;
            });
          }
        });
      });
    }
  });
});
