let express = require('express');
let bodyParser = require('body-parser');

module.exports = function(device) {
  let app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  require('../app/routes/index.routes.js')(app, device);

  return app;
};
