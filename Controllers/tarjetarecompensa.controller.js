const db = require("C:\Users\Principal\Documents\proyecto_constr\RewardsSystem\oscarv7_rewards.sql"); // Asegúrate de que esta sea la conexión correcta

// Consultar información de la tarjeta de recompensa
exports.consultarTarjeta = (req, res) => {
    const tarjetaId = req.params.id;

    // Consultar la tarjeta
    db.query('SELECT Telefono, id_Establecimiento, Version, Emision FROM Recompensa WHERE id = ?', [tarjetaId], (err, tarjeta) => {
        if (err) {
            console.error("Error al obtener la tarjeta:", err);
            return res.status(500).send("Hubo un error al obtener la tarjeta.");
        }
        if (tarjeta.length === 0) {
            return res.status(404).send("Tarjeta no encontrada.");
        }
        // Renderizar la vista con la información de la tarjeta
        res.render('consultaTarjeta', { tarjeta: tarjeta[0] });
    });
};

