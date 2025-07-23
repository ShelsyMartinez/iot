const datos = {
  labels: ['12:00', '12:01', '12:02'],
  datasets: [{
    label: 'Temperatura (°C)',
    data: [22, 23, 21],
    borderColor: 'red',
    fill: false
  }]
};
new Chart(document.getElementById('graficaTemperatura'), {
  type: 'line',
  data: datos
});
