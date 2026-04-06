const express = require("express");
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Rutas
require("./app/routes/maquina.routes")(app);

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});