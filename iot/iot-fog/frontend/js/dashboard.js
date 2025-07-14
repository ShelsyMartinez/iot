0async function cargarDashboard() {
  const token = localStorage.getItem('token');
  if (!token) {
    alert("No has iniciado sesión");
    window.location.href = "index.html";
    return;
  }

  try {
    // Obtener perfil
    const perfilResp = await fetch('http://3.16.48.213:8000/profile', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const perfil = await perfilResp.json();
    document.getElementById("username").textContent = perfil.usuario.username;
    document.getElementById("email").textContent = perfil.usuario.email;
    document.getElementById("rol").textContent = perfil.usuario.rol;

    // Obtener reglas ACL
    const aclResp = await fetch('http://3.16.48.213:8000/emqx/mqtt-acl', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const reglas = await aclResp.json();
   
   if (!Array.isArray(reglas)) {
  throw new Error("Respuesta de /mqtt-acl no es una lista");
}

    const mapaACL = {};
    reglas.forEach(r => {
      if (!mapaACL[r.username]) mapaACL[r.username] = [];
      mapaACL[r.username].push(r.topic);
    });

    // Obtener usuarios
    const usuariosResp = await fetch('http://3.16.48.213:8000/users', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const usuarios = await usuariosResp.json();

    const tabla = document.getElementById("tabla-usuarios");
    tabla.innerHTML = ""; // Limpiar tabla

    usuarios.forEach(u => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${u.username}</td>
        <td>${u.email}</td>
        <td>${u.rol}</td>
        <td>${(mapaACL[u.username] || []).join("<br>")}</td>
      `;
      tabla.appendChild(fila);
    });

  } catch (error) {
    alert("Error al cargar el dashboard: " + error.message);
    localStorage.removeItem("token");
    window.location.href = "index.html";
  }
}

function cerrarSesion() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

window.onload = cargarDashboard;
