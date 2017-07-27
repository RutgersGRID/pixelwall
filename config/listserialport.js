const fileExists = require('file-exists');
const prompt = require('prompt');
const fs = require('fs');

module.exports = {
  existsConfig: function(callback) {
    fileExists('./config/default.json', function(err, exists) {
      callback(err,exists);
    })
  },
  updateConfigFile: function(port, callback) {
    let file = require('./default.json');
    file.port = port;

    console.log('Writing to config/default.json');
    fs.writeFile('./config/default.json', JSON.stringify(file, null, 2), function(err) {
      if(err) {
        callback(err);
      }
      else {
        console.log('Done');
        return;
      }
    });
  },
  createConfigFile: function(port, callback) {
    let file = {};
    file.port = port;
    file.ip = '';

    console.log('Creating config/default.json');
    fs.writeFile('./config/default.json', JSON.stringify(file, null, 2), function(err) {
      if(err) {
        callback(err);
      }
      else {
        console.log('Done');
        return;
      }
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
  startPrompt: function() {
    prompt.start();
    return;
  },
  getConfirmationPrompt: function(callback) {
    let confirmation = {
      name:'confirmation',
      validator: /^[Y|y](es|ES)?$|^[N|n][O|o]?$/,
      warning: 'Must respond yes(Y) or no(N)'
    };

    prompt.get(confirmation, function(err, result) {
      callback(err, result);
    });
  },
  getPortPrompt: function(numPorts, callback) {
    let re = new RegExp('^[0-' + (numPorts-1).toString() + ']$');

    let portNum = {
      name: 'num',
      type: 'integer',
      warning: 'Select a number'
    };

    prompt.get(portNum, function(err, result) {
      //test result for regex satisfaction
      if(re.test(result.num)){
        callback(err, result);
      }
      else {
        console.log('Please choose a number from the list');
        module.exports.getPortPrompt(numPorts, callback);
      }
    });
  }
};
