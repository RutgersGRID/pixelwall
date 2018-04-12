module.exports = function(app, board) {
  let controller = require('../controllers/index.controllers.js');

  let addBoard = function(req, res, next) {
    req.board = board;
    next();
  }

  //root description json file
  app.route('/things/pixelwall')
    .get(controller.description);

  //returns JSON description of immediate attributes of thing
  app.route('/things/pixelwall/:attribute')
    .get(controller.attribute);

  //pass board object as part of req in our own middleware
  //return values of property
  app.route('/things/pixelwall/properties/:property')
    .get(addBoard, controller.property);
};
