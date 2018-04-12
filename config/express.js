let express = require('express');
let bodyParser = require('body-parser');

module.exports = function(board) {
  let app = express();

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  require('../app/routes/index.routes.js')(app, board);

  return app;
};
