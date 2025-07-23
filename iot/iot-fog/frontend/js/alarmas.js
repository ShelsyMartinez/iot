if (temperatura > 30) {
  document.getElementById('alarmas-container').innerHTML += `
    <div class="alarma alerta-roja">🔥 Temperatura muy alta: ${temperatura}°C</div>
  `;
}
