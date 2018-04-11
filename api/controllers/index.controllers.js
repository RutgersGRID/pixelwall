let data = require('../description.json');

exports.description = function(req, res) {
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(data, null, 4));
};

exports.attribute = function(req,res) {
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(data[req.params.attribute], null, 4));
};

exports.property = function(req, res) {
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(data.properties[req.params.property], null, 4));
};
