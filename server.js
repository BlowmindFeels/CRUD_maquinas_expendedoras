const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./app/routes/maquina.routes")(app);

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});