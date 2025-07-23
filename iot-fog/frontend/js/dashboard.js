async function crearUsuario(event) {
  event.preventDefault();
  const token = localStorage.getItem("token");
  const mensaje = document.getElementById("mensaje-creacion");

  const data = {
    username: document.getElementById("nuevo-username").value.trim(),
    password: document.getElementById("nuevo-password").value.trim(),
    email: document.getElementById("nuevo-email").value.trim(),
    name: document.getElementById("nuevo-name").value.trim(),
    country: document.getElementById("nuevo-country").value.trim(),
    city: document.getElementById("nuevo-city").value.trim(),
    company: document.getElementById("nuevo-company").value.trim() || null,
    rol: document.getElementById("nuevo-rol").value || "usuario"
  };

  if (!data.username || !data.password || !data.email || !data.name || !data.country || !data.city) {
    mensaje.textContent = "⚠️ Todos los campos obligatorios deben estar llenos.";
    mensaje.style.color = "red";
    return;
  }

  console.log("📤 Enviando al backend:", data);

  try {
    const res = await fetch("http://3.16.48.213:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const error = await res.json();
      mensaje.textContent = error.detail || "❌ No se pudo crear el usuario.";
      mensaje.style.color = "red";
      return;
    }

    mensaje.textContent = "✅ Usuario creado exitosamente.";
    mensaje.style.color = "green";
    cargarDashboard();
    document.getElementById("form-crear-usuario").reset();
  } catch (err) {
    console.error("Error al crear usuario:", err);
    mensaje.textContent = "❌ Error de red. Intenta más tarde.";
    mensaje.style.color = "red";
  }
}

// Crear Dispositivo
async function crearDispositivo(event) {
  event.preventDefault();
  const token = localStorage.getItem('token');
  const deviceId = document.getElementById("nuevo-device-id").value;
  const deviceName = document.getElementById("nuevo-device-name").value;

  try {
    const res = await fetch("http://3.16.48.213:8000/devices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ device_id: deviceId, name: deviceName })
    });

    if (res.ok) {
      alert("✅ Dispositivo creado");
      event.target.reset();
    } else {
      const error = await res.json();
      alert("❌ Error al crear dispositivo: " + error.detail);
    }
  } catch (err) {
    console.error(err);
    alert("❌ Error de conexión al crear dispositivo");
  }
}

// Crear Variable
async function crearVariable(event) {
  event.preventDefault();
  const token = localStorage.getItem('token');
  const data = {
    device_id: document.getElementById("variable-device-id").value,
    variable_id: document.getElementById("variable-id").value,
    unit: document.getElementById("variable-unit").value,
    min: parseFloat(document.getElementById("variable-min").value),
    max: parseFloat(document.getElementById("variable-max").value),
  };

  try {
    const res = await fetch("http://3.16.48.213:8000/variables", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      alert("✅ Variable creada");
      event.target.reset();
    } else {
      const error = await res.json();
      alert("❌ Error al crear variable: " + error.detail);
    }
  } catch (err) {
    console.error(err);
    alert("❌ Error de conexión al crear variable");
  }
}

// Crear Alarma
async function crearAlarma(event) {
  event.preventDefault();
  const token = localStorage.getItem('token');
  const data = {
    device_id: document.getElementById("alarma-device-id").value,
    variable_id: document.getElementById("alarma-variable-id").value,
    field: document.getElementById("alarma-field").value,
    operator: document.getElementById("alarma-operator").value,
    threshold: parseFloat(document.getElementById("alarma-threshold").value)
  };

  try {
    const res = await fetch("http://3.16.48.213:8000/alarms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      alert("✅ Alarma creada");
      event.target.reset();
    } else {
      const error = await res.json();
      alert("❌ Error al crear alarma: " + error.detail);
    }
  } catch (err) {
    console.error(err);
    alert("❌ Error de conexión al crear alarma");
  }
}

function cerrarSesion() {
  localStorage.removeItem("token");
  localStorage.removeItem("mqttUser");
  window.location.href = "index.html";
}
