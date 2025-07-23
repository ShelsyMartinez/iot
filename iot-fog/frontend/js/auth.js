async function recuperarUsuario() {
  const token = document.getElementById('token').value.trim();

  if (!token) {
    alert("Por favor, pega tu token.");
    return;
  }

  try {
    const response = await fetch('http://localhost:8000/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error("Token inválido o expirado");

    const data = await response.json();
    document.getElementById('resultado').textContent = `Tu nombre de usuario es: ${data.usuario.username}`;
  } catch (err) {
    document.getElementById('resultado').textContent = `Error: ${err.message}`;
  }
}
