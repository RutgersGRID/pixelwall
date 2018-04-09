let express = require('express');
let bodyParser = require('body-parser');

module.exports = function() {
  let app = express();

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  require('../api/routes/index.routes.js')(app);

  return app;
};
