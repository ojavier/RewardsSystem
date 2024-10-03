const { request, response } = require("express");
const Clientes = require('../Models/clientes.models');

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
    const usuario = request.session.usuario;
    response.render('miInformacion', {
        pagePrimaryTitle: 'Mi Información',
        usuario: usuario,
        isLoggedIn: request.session.isLoggedIn || false,
    });
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

exports.getClientes = async (request, response, next) => {
    try {
      const clientes = await Clientes.obtenerTodos();
      response.render('misClientes', { Clientes: clientes });
    } catch (err) {
      console.error(err);
      response.status(500).send({ message: 'Error al obtener clientes' });
    }
};

  exports.buscarClienteSearch = (request,response, next) => {
    const Telefono = request.query.Telefono

    Clientes.buscarClienteSearch(Telefono, (err,cliente) => {
        if (err) {
            console.error(err);
            response.status(500).send({ message: 'Error al buscar cliente' });
          } else if (!cliente) {
            response.status(404).send({ message: 'Cliente no encontrado' });
          } else {
            response.render('misClientes', { Clientes: cliente });
          }
    });
    
};