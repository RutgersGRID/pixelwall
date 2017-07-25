const test = require("tape");
const configSetUp = require("./listserialport.js");

const config = require('config');

test('should retrieve current port and IP', function(t) {
  configSetUp.existsConfig(function(err, exists) {
    if(exists) {
      //if file exists, get port+ip values
      t.notEqual(null, configSetUp.getPort(config));
      t.notEqual(null, configSetUp.getIP(config));

    }
    else {
      //no config file, run prompt and make one

    }
    t.end();
  });
});
