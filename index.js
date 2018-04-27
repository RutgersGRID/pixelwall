let device = require('./config/device.js')();
let app = require('./config/express.js')(device);
let server = require('http').Server(app);
let dnssd = require('dnssd');

const PORT = process.env.PORT || 3000;

let dns = new dnssd.Advertisement(
  new dnssd.ServiceType('_http._tcp,_webthing'),
  PORT, 
  { 
    name: 'pixel wall', 
    txt: {
      url: 'DESKTOP-1CJCEB2.local'
    }
  });
  

device.board.on('ready', function() {
  device.setup();
  server.listen(PORT, function() {
    console.log('Server listening on port ' + PORT );
    dns.start();
    console.log(dns);
  });
});
