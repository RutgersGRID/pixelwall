let data = require('../description.json');

exports.description = function(req, res) {
  res.send(JSON.stringify(data));
};
