const Sello = require("C:\Users\gaelc\RewardsSystem\Models\selloActual.models.js");

// Función para mostrar los sellos de un usuario por su telefono
exports.mostrarSellos = async(req, res) => {
  const {Telefono} = req.body;

  console.log("Telefono recibido:", Telefono);

  Sello.obtenerSellosPorTelefono(Telefono)
    .then(([resultados])=> {
      if (resultados.length === 0 || resultados[0].sellos === 0){
        return res.status(404).json({mensaje: "Usuario no encontrado o sin sellos"});
      }

      const selloActuales = resultados[0].sellos;
      res.render("misTarjetas", {Telefono, sellos: selloActuales});
    })

    .catch(error => {
      console.error("Error al obtener sellos:", error);
      return res.status(500).json({error: "Error al obtener sellos"});
    });


};