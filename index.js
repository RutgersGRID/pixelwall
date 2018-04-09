let express = require('./config/express.js');
let app = express();
let server = require('http').Server(app);

server.listen(3000, function() {
  console.log('Server listening on port 3000.');
});
