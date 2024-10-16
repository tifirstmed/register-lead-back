const express = require('express');
const router = express.Router();
const pool = require('../models/dataModel');
const { formatDateToPeruTime } = require('../utils/dateUtils'); // Mover la lógica de fecha a un helper

// Ruta para agregar un cliente
router.post('/lead-register', async (req, res) => {
  const { id, nombres, apellidos, celular, correo, descripcion, producto } =
    req.body;

  if (!id || !nombres || !apellidos || !celular || !correo || !producto) {
    return res
      .status(400)
      .json({ message: 'Todos los campos son obligatorios.' });
  }

  try {
    const formattedDate = formatDateToPeruTime(); // Mover lógica de fecha a un helper
    console.log(
      `Lead por registrar,  id:${id}, nombres:${nombres}, apellidos:${apellidos}, celular:${celular}, correo:${correo}, descripcion:${descripcion}, fecha:${formattedDate} ,producto:${producto}`
    );

    const [result] = await pool.execute(
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
  }
});

module.exports = router;
