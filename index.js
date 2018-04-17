let device = require('./config/device.js')();
let app = require('./config/express.js')(device);
let server = require('http').Server(app);

const PORT = process.env.PORT || 3000;

let initialDesign = [];
for(let i = 0; i < device.properties.width*device.properties.height; i++) {
  initialDesign.push([255, 255, 255]);
}

device.board.on('ready', function() {
  device.leds.clear();
  device.leds.setBrightness(device.properties.brightness);
  //device.leds.alertHIGH();
  //below doesn't display :( could it be a powering issue? 
  //but then why does the above work?
  device.leds.setImage(initialDesign, device.properties.width, device.properties.height);

  server.listen(PORT, function() {
    console.log('Server listening on port ' + PORT );
  });

});
