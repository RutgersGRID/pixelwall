let board = require('./led/fiveBoard.js')();
let app = require('./config/express.js')(board);
let server = require('http').Server(app);
const PORT = process.env.PORT || 3000;

board.on('ready', function() {
  console.log("Board properties:");
  console.log(board.properties);
  server.listen(PORT, function() {
    console.log('Server listening on port ' + PORT );
  });

});
