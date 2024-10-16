// utils/dateUtils.js
function formatDateToPeruTime() {
  const currentDate = new Date();
  const peruTimeOffset = -5 * 60; // Hora de Perú UTC-5
  const utcTime =
    currentDate.getTime() + currentDate.getTimezoneOffset() * 60000;
  const peruTime = new Date(utcTime + peruTimeOffset * 60000);

  // Formatear la fecha en el formato yyyy-mm-dd
  return `${peruTime.getFullYear()}-${(peruTime.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${peruTime.getDate().toString().padStart(2, '0')}`;
}

module.exports = { formatDateToPeruTime };
