require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const leadsRoutes = require('./routes/leads'); // Importar las rutas
const { errorHandler } = require('./middlewares/errorHandler'); // Middleware de error centralizado
const app = express();
const PORT = process.env.PORT || 3001;

// Seguridad
app.use(helmet()); // Añadir cabeceras de seguridad HTTP

// Middleware CORS
const allowedOrigins = [/\.firstmed\.com\.pe$/, 'http://38.25.36.79'];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Permitir solicitudes sin origen
    const isAllowed = allowedOrigins.some((pattern) =>
      typeof pattern === 'string' ? pattern === origin : pattern.test(origin)
    );
    isAllowed
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS'));
  },
};
app.use(cors(corsOptions));

// Middleware para parsear JSON
app.use(bodyParser.json({ limit: '10mb' })); // Para recibir JSON en las peticiones

// Rutas
app.use('/api', leadsRoutes);

// Middleware para capturar errores
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
