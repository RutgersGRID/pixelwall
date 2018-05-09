module.exports = function(app, device) {
  let controller = require('../controllers/index.controllers.js');

  let addDevice = function(req, res, next) {
    req.device = device;
    next();
  }

  //root description json file
  app.route('/')
    .get(controller.description);

  //returns JSON description of immediate attributes of thing
  app.route('/:attribute')
    .get(controller.attribute);

  //pass board object as part of req in our own middleware
  //return values of property
  app.route('/properties/:property')
    .get(addDevice, controller.property);

  app.route('/properties/on')
    .put(addDevice, controller.on);

  app.route('/properties/brightness')
    .put(addDevice, controller.brightness);

  app.route('/properties/led')
    .put(addDevice, controller.led);
};
