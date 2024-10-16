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

pool
  .getConnection()
  .then(() => console.log('Conectado a la base de datos'))
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1); // Cerrar la aplicación en caso de error
  });

module.exports = pool;
