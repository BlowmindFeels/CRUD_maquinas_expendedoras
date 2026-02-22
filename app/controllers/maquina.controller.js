const Maquina = require("../models/maquina.model");

exports.findAll = (req, res) => {
  Maquina.getAll((err, data) => {
    if (err) res.status(500).send(err);
    else res.send(data);
  });
};