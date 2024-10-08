const Reportes = require('../Models/reportes.models'); // Asegúrate de que la ruta sea correcta

// Controlador para la vista de reportes
exports.getTopTenderos = async (req, res) => {
    try {
        // Obtener el top 10 tenderos
        const [tenderos] = await Reportes.obtenerTop10Tenderos();

        // Renderizar la vista, pasando los datos de los tenderos
        res.render('reportes/topTenderos', {
            tenderos // Los datos se pasarán a la vista
        });
    } catch (error) {
        console.error('Error al obtener los tenderos: ', error);
        // Puedes manejar el error aquí, redirigir o mostrar un mensaje de error
        res.status(500).send('Error al obtener los datos de los tenderos');
    }
};
