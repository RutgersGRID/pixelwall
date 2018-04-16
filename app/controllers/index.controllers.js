let description = require('../../config/description.json');

exports.description = function(req, res) {
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(description, null, 4));
};

exports.attribute = function(req,res) {
  //handle case where doesn't exist
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(description[req.params.attribute], null, 4));
};

exports.property = function(req, res) {
  let propertyObj = {};
  let property = req.params.property;

  propertyObj[property] = req.board.properties[property];

  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(propertyObj, null, 4));
};
