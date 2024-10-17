const Reportes = require('../models/reportes.models'); // Asegúrate de que la ruta sea correcta

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

// Controlador para Sellos por hora
exports.getSellosPorHora = async (req, res) => {
    try {
        // Obtener los datos de sellos por hora
        const [sellosPorHora] = await Reportes.obtenerSellosPorHora();

        // Devolver los datos en formato JSON
        console.log(sellosPorHora);
        res.json(SellosPorHora);
    } catch (error) {
        console.error('Error al obtener los sellos por hora: ', error);
        res.status(500).json({ message: 'Error al obtener los datos sellos por hora' });
    }
};