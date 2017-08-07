const test = require("tape");
const helper = require("./setup_helper.js");

const config = require('config');

test('should retrieve current port and IP', function(t) {
  helper.existsConfig(function(err, exists) {
    if(exists) {
      //if file exists, get port+ip values
      t.notEqual(null, helper.getPort(config));
      t.notEqual(null, helper.getIP(config));
    }
    else {
      //no config file, run prompt and make one

    }
    t.end();
  });
});
