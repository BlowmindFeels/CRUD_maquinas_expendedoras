const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "mysql",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "1234",
  database: process.env.DB_NAME || "maquinas_db"
});

function connectWithRetry() {
  connection.connect((err) => {
    if (err) {
      console.log("Esperando a MySQL...");
      setTimeout(connectWithRetry, 3000);
    } else {
      console.log("Conectado a MySQL");
    }
  });
}

connectWithRetry();

module.exports = connection;