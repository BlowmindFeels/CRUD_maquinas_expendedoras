const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: "root",
  password: "root",
  database: "maquinas_db"
});

connection.connect((err) => {
  if (err) {
    console.error("Error conectando:", err);
    return;
  }
  console.log("Conectado a MySQL");
});

module.exports = connection;