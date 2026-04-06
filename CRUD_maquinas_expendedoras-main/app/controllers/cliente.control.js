
// app/controllers/cliente.controller.js

let clientes = []; // almacenamiento temporal
let idCounter = 1;

// Crear cliente
exports.create = (req, res) => {
  const { nombre, correo, telefono } = req.body;
  if (!nombre || !correo || !telefono) {
    return res.status(400).json({ message: "Faltan datos" });
  }
  const nuevoCliente = { id: idCounter++, nombre, correo, telefono };
  clientes.push(nuevoCliente);
  res.status(201).json(nuevoCliente);
};

// Obtener todos los clientes
exports.findAll = (req, res) => {
  res.json(clientes);
};

// Obtener cliente por ID
exports.findOne = (req, res) => {
  const id = parseInt(req.params.clienteId);
  const cliente = clientes.find((c) => c.id === id);
  if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });
  res.json(cliente);
};

// Actualizar cliente
exports.update = (req, res) => {
  const id = parseInt(req.params.clienteId);
  const cliente = clientes.find((c) => c.id === id);
  if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });

  const { nombre, correo, telefono } = req.body;
  cliente.nombre = nombre || cliente.nombre;
  cliente.correo = correo || cliente.correo;
  cliente.telefono = telefono || cliente.telefono;

  res.json(cliente);
};

// Eliminar cliente por ID
exports.delete = (req, res) => {
  const id = parseInt(req.params.clienteId);
  clientes = clientes.filter((c) => c.id !== id);
  res.json({ message: `Cliente ${id} eliminado` });
};

// Eliminar todos los clientes
exports.deleteAll = (req, res) => {
  clientes = [];
  res.json({ message: "Todos los clientes fueron eliminados" });
};