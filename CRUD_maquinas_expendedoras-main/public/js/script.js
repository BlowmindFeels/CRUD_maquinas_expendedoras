const API_URL = "/maquinas";

let editandoId = null;

const form      = document.getElementById("maquinaForm");
const btnSubmit = form.querySelector("button[type='submit']");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const maquina = {
    nombre:    document.getElementById("nombre").value,
    ubicacion: document.getElementById("ubicacion").value,
    capacidad: document.getElementById("capacidad").value,
    estado:    document.getElementById("estado").value,
  };

  if (editandoId !== null) {
    await fetch(`${API_URL}/${editandoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(maquina),
    });
    editandoId = null;
    btnSubmit.textContent = "Agregar";
  } else {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(maquina),
    });
  }

  form.reset();
  cargarMaquinas();
});

async function cargarMaquinas() {
  const res      = await fetch(API_URL);
  const maquinas = await res.json();
  const tabla    = document.getElementById("tablaMaquinas");
  tabla.innerHTML = "";

  if (!maquinas.length) {
    tabla.innerHTML = `<tr><td colspan="6" style="text-align:center">Sin registros</td></tr>`;
    return;
  }

  maquinas.forEach((m) => {
    tabla.innerHTML += `
      <tr>
        <td>${m.id}</td>
        <td>${m.nombre}</td>
        <td>${m.ubicacion}</td>
        <td>${m.capacidad}</td>
        <td>${m.estado}</td>
        <td>
          <button onclick="editar(${m.id},'${m.nombre}','${m.ubicacion}',${m.capacidad},'${m.estado}')">✏️ Editar</button>
          <button onclick="eliminar(${m.id})">🗑️ Eliminar</button>
        </td>
      </tr>`;
  });
}

function editar(id, nombre, ubicacion, capacidad, estado) {
  editandoId = id;
  document.getElementById("nombre").value    = nombre;
  document.getElementById("ubicacion").value = ubicacion;
  document.getElementById("capacidad").value = capacidad;
  document.getElementById("estado").value    = estado;
  btnSubmit.textContent = "Guardar cambios";
  form.scrollIntoView({ behavior: "smooth" });
}

async function eliminar(id) {
  if (!confirm(`¿Eliminar la máquina #${id}?`)) return;
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  cargarMaquinas();
}

cargarMaquinas();