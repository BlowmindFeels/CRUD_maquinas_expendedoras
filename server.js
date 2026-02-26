const express = require("express");

const app = express();

app.use(express.static("public"));

require("./app/routes/maquina.routes")(app);

app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "mysql", //nombre del servicio en docker-compose
  user: "root", //user
  password: "root", //contraseña
  database: "maquinas_db"//nombre db
});

app.get("/", (req, res) => {
  res.send("API funcionando correctamente");
});

connection.connect((err) => {
  if (err) {
    console.error("Error conectando a MySQL:", err);
    return;
  }
  console.log("Conectado a MySQL");

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS maquinas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      ubicacion VARCHAR(150) NOT NULL,
      capacidad INT NOT NULL,
      estado VARCHAR(50) NOT NULL,
      fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  connection.query(createTableQuery, (err) => {
    if (err) {
      console.error("Error creando la tabla:", err);
    } else {
      console.log("Tabla maquinas verificada o creada correctamente");
    }
  });
});