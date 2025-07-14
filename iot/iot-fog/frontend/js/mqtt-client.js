// Configura conexión
const brokerUrl = 'ws://3.16.48.213:8083/mqtt'; // WebSocket listener de EMQX
const mqttUser = 'SHELSY';      // Usa el usuario MQTT válido
const mqttPassword = '123456789'; // Contraseña del usuario

const options = {
  clean: true,
  connectTimeout: 4000,
  clientId: 'web-client-' + Math.floor(Math.random() * 1000),
  username: mqttUser,
  password: mqttPassword
};

const client = mqtt.connect(brokerUrl, options);

// Al conectar
client.on('connect', () => {
  console.log('✅ Conectado a EMQX vía WebSocket');
  client.subscribe('SHELSY/#', (err) => {
    if (err) {
      console.error('❌ Error al suscribirse:', err);
    } else {
      console.log('📡 Suscrito a SHELSY/#');
    }
  });
});

// Al recibir mensaje
client.on('message', (topic, message) => {
  const output = document.getElementById('mqtt-output');
  const nuevoDato = document.createElement('p');
  nuevoDato.textContent = `📨 ${topic}: ${message.toString()}`;
  output.prepend(nuevoDato);
});

// Errores
client.on('error', err => {
  console.error('❌ Error de conexión:', err);
});
