const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true, // Esperar a que haya conexiones disponibles
  connectionLimit: 10, // Limitar el número máximo de conexiones
  queueLimit: 0, // Sin límite de cola
});

module.exports = pool;
