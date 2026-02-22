const Maquina = require("../models/maquina.model");

exports.findAll = (req, res) => {
  Maquina.getAll((err, data) => {
    if (err) res.status(500).send(err);
    else res.send(data);
  });
};

exports.create = (req, res) => {
  res.send("create funcionando");
};

exports.findOne = (req, res) => {
  res.send("findOne funcionando");
};

exports.update = (req, res) => {
  res.send("update funcionando");
};

exports.delete = (req, res) => {
  res.send("delete funcionando");
};