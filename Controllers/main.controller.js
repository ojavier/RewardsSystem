const { request, response } = require("express");

// Función para obtener las tarjetas de un establecimiento
exports.getTarjetas = (request, response, next) => {
    const idEstablecimiento = request.query.establecimiento;

    console.log('idEstablecimiento:', idEstablecimiento); // Aquí agregas el console.log

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

exports.getRoot = (request, response, next) => {
    const isLoggedIn = request.session.isLoggedIn || false;
    if (!isLoggedIn) {
        return response.redirect('/usuario/login');
    }
    response.render('misTarjetas', {
        pagePrimaryTitle: 'Mis Tarjetas',
        isLoggedIn: isLoggedIn,
        usuario: request.session.usuario || {},
        sellos: 1
    });
};


exports.getConfig = (request, response, next) => {
    response.render('configuracion');
};

exports.getInfo = (request, response, next) => {
    response.render('miInformacion');
};

exports.getReportes = (request, response, next) => {
    response.render('Reportes');
};

exports.getEquipo = (request, response, next) => {
    response.render('miEquipo')
};

exports.getSucursales = (request, response, next) => {
    response.render("misSucursales")
};