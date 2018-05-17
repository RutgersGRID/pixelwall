let express = require('express');
let bodyParser = require('body-parser');

module.exports = function(device) {
  let app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    if('OPTIONS' === req.method) {
      console.log("FOUND OPTION");
      res.sendStatus(200);
    }
    else {
      next();
    }
  });

  require('../app/routes/index.routes.js')(app, device);

  return app;
};
