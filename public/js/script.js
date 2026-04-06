const API_URL = "/maquinas";

let editandoId = null;

const form       = document.getElementById("maquinaForm");
const btnSubmit  = form.querySelector("button[type='submit']");
const btnCancel  = document.getElementById("btnCancelar");

btnCancel.classList.add("hidden");
btnCancel.addEventListener("click", () => {
  editandoId = null;
  btnSubmit.textContent = "Agregar";
  form.reset();
  btnCancel.classList.add("hidden");
});

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
    btnCancel.classList.add("hidden");
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
    tabla.innerHTML = `<tr><td colspan="6" class="no-data">Sin registros</td></tr>`;
    return;
  }

  maquinas.forEach((m) => {
    tabla.innerHTML += `
      <tr>
        <td data-label="ID">${m.id}</td>
        <td data-label="Nombre">${m.nombre}</td>
        <td data-label="Ubicación">${m.ubicacion}</td>
        <td data-label="Capacidad">${m.capacidad}</td>
        <td data-label="Estado">${m.estado}</td>
        <td data-label="Acciones">
          <button class="btn btn-warning btn-small" onclick="editar(${m.id},'${m.nombre}','${m.ubicacion}',${m.capacidad},'${m.estado}')">✏️ Editar</button>
          <button class="btn btn-danger btn-small" onclick="eliminar(${m.id})">🗑️ Eliminar</button>
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
  btnCancel.classList.remove("hidden");
  form.scrollIntoView({ behavior: "smooth" });
}

async function eliminar(id) {
  if (!confirm(`¿Eliminar la máquina #${id}?`)) return;
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  cargarMaquinas();
}

cargarMaquinas();