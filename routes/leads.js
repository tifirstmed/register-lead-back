const express = require('express');
const router = express.Router();
const pool = require('../models/dataModel');
const { formatDateToPeruTime } = require('../utils/dateUtils');

// Ruta para agregar un cliente
router.post('/lead-register', async (req, res) => {
  const { id, nombres, apellidos, celular, correo, descripcion, producto } =
    req.body;

  if (!id || !nombres || !apellidos || !celular || !correo || !producto) {
    return res
      .status(400)
      .json({ message: 'Todos los campos son obligatorios.' });
  }

  let connection; // Declarar la conexión aquí

  try {
    connection = await pool.getConnection(); // Obtener una conexión del pool
    const formattedDate = formatDateToPeruTime(); // Mover lógica de fecha a un helper
    console.log(
      `Lead por registrar, id:${id}, nombres:${nombres}, apellidos:${apellidos}, celular:${celular}, correo:${correo}, descripcion:${descripcion}, fecha:${formattedDate}, producto:${producto}`
    );

    const [result] = await connection.execute(
      'INSERT INTO leads (id, nombres, apellidos, celular, correo, descripcion, fecha, producto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        id,
        nombres,
        apellidos,
        celular,
        correo,
        descripcion,
        formattedDate,
        producto,
      ]
    );

    res
      .status(201)
      .json({ message: 'Cliente agregado exitosamente', data: result });
  } catch (error) {
    console.error('Error al insertar los datos', error);
    res.status(500).json({ message: 'Error en el servidor' });
  } finally {
    if (connection) {
      connection.release(); // Liberar la conexión de vuelta al pool
    }
  }
});

// Ruta para agregar un cliente en tiktok
router.post('/lead-register-tiktok', async (req, res) => {
  const { id, nombres, apellidos, celular, correo, descripcion, producto } =
    req.body;

  if (!id || !nombres || !apellidos || !celular || !correo || !producto) {
    return res
      .status(400)
      .json({ message: 'Todos los campos son obligatorios.' });
  }

  let connection;

  try {
    connection = await pool.getConnection();
    const formattedDate = formatDateToPeruTime(); // Mover lógica de fecha a un helper
    console.log(
      `Lead tiktok por registrar, id:${id}, nombres:${nombres}, apellidos:${apellidos}, celular:${celular}, correo:${correo}, descripcion:${descripcion}, fecha:${formattedDate}, producto:${producto}`
    );

    const [result] = await connection.execute(
      'INSERT INTO leads_tiktok (id, nombres, apellidos, celular, correo, descripcion, fecha, producto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        id,
        nombres,
        apellidos,
        celular,
        correo,
        descripcion,
        formattedDate,
        producto,
      ]
    );

    res
      .status(201)
      .json({ message: 'Cliente agregado exitosamente', data: result });
  } catch (error) {
    console.error('Error al insertar los datos', error);
    res.status(500).json({ message: 'Error en el servidor' });
  } finally {
    if (connection) {
      connection.release(); // Liberar la conexión de vuelta al pool
    }
  }
});

module.exports = router;
