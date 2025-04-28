// utils/dateUtils.js
function getPeruTimeOnly() {
    const currentDate = new Date();
    const peruTimeOffset = -5 * 60; // Hora de Perú UTC-5
    const utcTime =
      currentDate.getTime() + currentDate.getTimezoneOffset() * 60000;
    const peruTime = new Date(utcTime + peruTimeOffset * 60000);
  
    // Formatear la hora en formato HH:MM:SS
    return `${peruTime.getHours().toString().padStart(2, '0')}:${peruTime
      .getMinutes()
      .toString()
      .padStart(2, '0')}:${peruTime.getSeconds().toString().padStart(2, '0')}`;
  }
  
  module.exports = { getPeruTimeOnly };