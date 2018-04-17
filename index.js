let device = require('./config/device.js')();
let app = require('./config/express.js')(device);
let server = require('http').Server(app);

const PORT = process.env.PORT || 3000;

device.board.on('ready', function() {
  device.setup();
  server.listen(PORT, function() {
    console.log('Server listening on port ' + PORT );
  });

});
