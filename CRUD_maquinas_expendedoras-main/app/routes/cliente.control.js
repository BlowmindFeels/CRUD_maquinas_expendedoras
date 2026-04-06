// app/routes/cliente.routes.js
const express = require("express");
const router = express.Router();
const clientes = require("../controllers/cliente.controller.js");

// CRUD RUTAS
router.post("/", clientes.create);           // Crear nuevo cliente
router.get("/", clientes.findAll);           // Listar todos los clientes
router.get("/:clienteId", clientes.findOne); // Buscar un cliente por ID
router.put("/:clienteId", clientes.update);  // Actualizar un cliente
router.delete("/:clienteId", clientes.delete); // Eliminar un cliente
router.delete("/", clientes.deleteAll);      // Eliminar todos los clientes

module.exports = router;