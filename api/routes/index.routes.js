module.exports = function(app) {
  let controller = require('../controllers/index.controllers.js');

  app.route('/things/pixelwall')
    .get(controller.description);
};
