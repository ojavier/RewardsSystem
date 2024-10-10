const Reportes = require('../Models/reportes.models'); // Asegúrate de que la ruta sea correcta

// Controlador para Top Tenderos
exports.getTopTenderos = async (req, res) => {
    try {
        // Obtener el top tenderos
        const [tenderos] = await Reportes.obtenerTopTenderos();

        // Devolver los datos en formato JSON
        console.log(tenderos);
        res.json(tenderos);
    } catch (error) {
        console.error('Error al obtener los tenderos: ', error);
        res.status(500).json({ message: 'Error al obtener los datos de los tenderos' });
    }
};