const Sello = require('../Models/selloActual.models.js');

// Función para mostrar los sellos de un usuario por su teléfono
exports.mostrarSellos = (req, res, next) => {
  const { Telefono } = req.params; // Obtener el teléfono de los parámetros

  console.log('Buscando sellos para el teléfono:', Telefono);

  Sello.obtenerSellosPorTelefono(Telefono)
      .then(([resultados]) => {
          if (resultados.length === 0 || resultados[0].sellos === 0) {
              return res.status(404).send('Usuario no encontrado o sin sellos');
          }
          console.log('Sellos encontrados:', resultados[0].sellos); // Agregar un console.log para ver los sellos encontrados

          // Asegúrate de pasar 'sellos' a la vista
          const selloActuales = resultados[0].sellos;
          res.render("misTarjetas", { 
            Telefono, sellos: selloActuales,
            establecimientos: request.sesssion.establecimientos || [],
        }); // Asegúrate de pasar 'sellos'
      })
      .catch(err => {
          console.log('Error buscando sellos:', err);
          res.status(500).send('Error al buscar sellos');
      });
};
