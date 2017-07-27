const listSerialPort = require('./listserialport.js');
const config = require('config');
const serialport = require('serialport');

listSerialPort.existsConfig(function(err, exists) {
  if(exists) {
    let port = listSerialPort.getPort(config);
    let ip = listSerialPort.getIP(config);

    if(port !== '') console.log('Current port: ' + port);
    else console.log('No port value in config file');
    if(ip !== '') console.log('Current ip: ' + ip);
    else console.log('No ip value in config file');

    console.log('Would you like to update these values? (Y/N)');
    listSerialPort.startPrompt();
    listSerialPort.getConfirmationPrompt(function(err, result) {
      if(result.confirmation[0].toLowerCase() === 'y') {
        console.log('Please select a port');
        serialport.list(function(err, ports) {
          ports.forEach(function(port, i) {
            console.log('(%d): %s', i, port.comName);
          });
          listSerialPort.getPortPrompt(ports.length, function(err, result) {
            //Now need to update our JSON file
            listSerialPort.updateConfigFile(ports[result.num].comName, function(err) {
              if(err) return console.log(err);
              return;
            })
          });
        });
      }
      else { //user doesn't want to update config file
        return;
      }
    });
  }
  else {
    //file doesn't exist
    console.log('No config file found, creating a new one');
    listSerialPort.startPrompt();
    console.log('Please select a port:');
    serialport.list(function(err, ports) {
      ports.forEach(function(port, i) {
        console.log('(%d): %s', i, port.comName);
      });
      listSerialPort.getPortPrompt(ports.length, function(err, result) {
        //Now need to add to our json file: ports[result.num].comName
        listSerialPort.createConfigFile(ports[result.num].comName, function(err) {
          if(err) return console.log(err);
          return;
        });
      });
    });
  }
});
