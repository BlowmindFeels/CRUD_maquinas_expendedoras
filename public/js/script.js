const API_URL = "/maquinas";

  document.getElementById("maquinaForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const maquina = {
      nombre: document.getElementById("nombre").value,
      ubicacion: document.getElementById("ubicacion").value,
      capacidad: document.getElementById("capacidad").value,
      estado: document.getElementById("estado").value
    };

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(maquina)
    });

    cargarMaquinas();
    e.target.reset();
  });

  async function cargarMaquinas() {
    const res = await fetch(API_URL);
    const maquinas = await res.json();

    const tabla = document.getElementById("tablaMaquinas");
    tabla.innerHTML = "";

    maquinas.forEach(m => {
      tabla.innerHTML += `
        <tr>
          <td>${m.id}</td>
          <td>${m.nombre}</td>
          <td>${m.ubicacion}</td>
          <td>${m.capacidad}</td>
          <td>${m.estado}</td>
          <td>
            <button onclick="eliminar(${m.id})">Eliminar</button>
          </td>
        </tr>
      `;
    });
  }

  async function eliminar(id) {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });
    cargarMaquinas();
  }

  cargarMaquinas();