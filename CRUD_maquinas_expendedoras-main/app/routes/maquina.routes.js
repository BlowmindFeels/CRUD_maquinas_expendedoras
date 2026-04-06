module.exports = app => {
  const maquinas = require("../controllers/maquina.controller");

  app.get("/maquinas", maquinas.findAll);
  app.post("/maquinas", maquinas.create);
  app.get("/maquinas/:id", maquinas.findOne);
  app.put("/maquinas/:id", maquinas.update);
  app.delete("/maquinas/:id", maquinas.delete);
};