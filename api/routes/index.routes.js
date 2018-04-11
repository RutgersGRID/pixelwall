module.exports = function(app) {
  let controller = require('../controllers/index.controllers.js');

  app.route('/things/pixelwall')
    .get(controller.description);

  app.route('/things/pixelwall/:attribute')
    .get(controller.attribute);

  app.route('/things/pixelwall/properties/:property')
    .get(controller.property);
};
