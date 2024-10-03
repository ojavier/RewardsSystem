const Tarjeta = require('../Models/tarjetas.models'); // Importamos el modelo de tarjetas

// Función para obtener las tarjetas de un establecimiento
exports.getTarjetas = (request, response, next) => {
    const idEstablecimiento = request.query.establecimiento;

    // Llamamos al método del modelo para obtener las tarjetas
    Tarjeta.obtenerPorEstablecimiento(idEstablecimiento)
        .then(([results]) => {
            // Renderiza la vista 'mis_versiones.ejs' y pasa las tarjetas como un objeto
            response.render('misVersiones', {
                tarjetas: results,
                pagePrimaryTitle: 'Mis Versiones',
                isLoggedIn: request.session.isLoggedIn || false,
                usuario: request.session.usuario || {}
            });
        })
        .catch(err => {
            return response.status(500).send('Error al obtener las tarjetas');
        });
};