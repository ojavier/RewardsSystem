const db = require('../config/database');

// Función para mostrar sellos de un usuario por su teléfono
exports.mostrarSellosPorTelefono = (req, res) => {
  const { telefono } = req.body;  // Obtener el teléfono 

  // Consulta SQL para buscar al usuario por su número de teléfono
  const query = `SELECT sellos FROM usuarios WHERE Telefono = ?`;

  db.query(query, [telefono], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los sellos' });
    }

    // Si el usuario no existe, devolvemos un mensaje de error
    if (results.length === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Si el usuario existe, renderizamos la vista con los sellos
    const sellosActuales = results[0].sellos;

    res.render('misTarjetas', { telefono, sellos: sellosActuales });
  });
};
