let dnssd = require('dnssd');

let browser = new dnssd.Browser(dnssd.tcp('http'))
  .on('serviceUp', service => console.log("Device up: ", service))
  .on('serviceDown', service => console.log("Device down: ", service))
  .start();
