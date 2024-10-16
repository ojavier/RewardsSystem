const { request, response } = require('express');
const Tarjeta = require('../models/tarjetas.models'); // Importamos el modelo de tarjetas

// Función para obtener las tarjetas de un establecimiento
exports.getTarjetas = (request, response, next) => {
    const id_Establecimiento = request.session.establecimiento_id || '';

    console.log('idEstablecimiento:', id_Establecimiento);

    // Llamamos al método del modelo para obtener las tarjetas
    Tarjeta.obtenerPorEstablecimiento(id_Establecimiento)
        .then(([results]) => {
            console.log(results)
            // Renderiza la vista 'mis_versiones.ejs' y pasa las tarjetas como un objeto
            response.render('misVersiones', {
                tarjetas: results,
                pagePrimaryTitle: 'Mis Versiones',
                isLoggedIn: request.session.isLoggedIn || false,
                usuario: request.session.usuario || {},
                establecimientos: request.session.establecimientos || [],
                id_Establecimiento: id_Establecimiento,
            });
        })
        .catch(err => {
            return response.status(500).send('Error al obtener las tarjetas');
        });
};

exports.getCrearTarjeta = (request, response, next) => {
    const isLoggedIn = request.session.isLoggedIn || false;
    if (!isLoggedIn) {
        return response.redirect('${process.env.PATH_SERVER}usuario/login');
    }
    response.render('crearTarjeta', {
        pagePrimaryTitle: 'Crear tarjeta',
        isLoggedIn: isLoggedIn,
        usuario: request.session.usuario || {},
        establecimientos: request.session.establecimientos || [],
        id_Establecimiento: request.session.establecimiento_id || '',
    });
};