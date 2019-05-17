let device = require('./config/device.js')();
let app = require('./config/express.js')(device);
let server = require('http').Server(app);

let dnssd = require('dnssd');
let localIPv4Address = require('local-ipv4-address');

localIPv4Address().then((ipAddress) => {
  let url = 'http://' + ipAddress + ':' + PORT + '/';

  let dns = new dnssd.Advertisement(
    new dnssd.ServiceType('_http._tcp,_webthing'),
    PORT, { name: 'pixel wall', txt: { url } }
  );
	
let boardReady = false;
const PORT = process.env.PORT || 3000;

let socket = require('socket.io-client')('http://localhost:3001');

let cols = device.properties.width;
let rows = device.properties.height;;

let initialDesign = [];
for(let i = 0; i < cols*rows; i++) {
	  initialDesign.push([255,255,255]);
}


	socket.on('connect', function() {
		  socket.emit('identifier', {
			      type: 'device',
			      dimmensions: {
				            width: cols,
				            height: rows
				          },
			      boardState: initialDesign
			    });
	});

	socket.on('read', function(data) {
		if(boardReady) {
			switch(data.type) {
				case 'single-pixel':
					let newPixelNum = device.leds.sortPixel(data.pixel, cols, rows);
					device.leds.setPixelColor(newPixelNum, data.color[0], data.color[1], data.color[2]);
					device.leds.show();
					break;
				case 'all-pixels':
					device.leds.pushImage(data.colors, cols, rows);
					device.leds.setImage(ledstrip, cols, rows);
					device.leds.show();
					break;
				default:
					break;
			}
		}
	});


  device.board.on('ready', function() {
    device.setup();
    boardReady = true;

   
    server.listen(PORT, function() {
      console.log('Server listening on port ' + PORT );
      dns.start();

    
    });
  });
});
