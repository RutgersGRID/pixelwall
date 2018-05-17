let device = require('./config/device.js')();
let app = require('./config/express.js')(device);
let server = require('http').Server(app);
let socket = require('socket.io-client')('https://owlsketch.com/', {path: '/pixel1/socket.io'});

let boardReady = false;

let dnssd = require('dnssd');
let localIPv4Address = require('local-ipv4-address');

const PORT = process.env.PORT || 3000;

localIPv4Address().then((ipAddress) => {
  let url = 'http://' + ipAddress + ':' + PORT + '/';

  let dns = new dnssd.Advertisement(
    new dnssd.ServiceType('_http._tcp,_webthing'),
    PORT, { name: 'pixel wall', txt: { url } }
  );

  device.board.on('ready', function() {
    device.setup();
    server.listen(PORT, function() {
      boardReady = true;
      console.log('Server listening on port ' + PORT );
      dns.start();
    });

  });
});


//non-compliant to API Socket connection

let initialDesign = [];
for(let i = 0; i < device.properties.height*device.properties.width; i++) {
  initialDesign.push([255,255,255]);
}

socket.on('connect', function() {
  socket.emit('identifier', {
    type: 'device',
    dimmensions: {
      width: device.properties.width,
      height: device.properties.height 
    },
    boardState: initialDesign
  });
});

socket.on('read', function(data) {
  if(boardReady) {
    switch(data.type) {
      case 'single-pixel':
        let newPixelNum = device.leds.sortPixel(data.pixel, device.properties.width, device.properties.height);
        device.leds.setPixelColor(newPixelNum, data.color[0], data.color[1], data.color[2]);
        device.leds.show();
        break;
      case 'all-pixels':
        /*
        ledmanager.pushImage(data.colors, cols, rows);
        ledmanager.setImage(ledstrip, cols, rows);
        ledstrip.show();
        */
        break;
      default:
        break;
    }
  }
});
